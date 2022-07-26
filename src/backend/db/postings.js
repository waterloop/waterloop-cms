import {
  fromPosting,
  toPosting,
  fromRecommendedSkills,
  fromSkillsToBeLearned,
  toRecommendedSkills,
  toSkillsToBeLearned,
} from '../models/postings';
import * as R from 'ramda';
import isEmpty from '../utils/is-empty';
import { parseTimeForResponse, parseTimeFromRequest } from '../utils/db-dates';
import handleRawResponse from '../utils/handle-raw-response';

const getPostings = (db) => () =>
  db
    .select('title', 'deadline', 'closed', 'team_id', 'last_updated', 'id')
    .from('postings')
    .then((data) =>
      data.map(toPosting).map((posting) => ({
        ...posting,
        deadline: parseTimeForResponse(posting.deadline),
      })),
    );

const getPostingsWithTeamNames = (db) => () =>
  db
    .select(
      'postings.title',
      'postings.deadline',
      'postings.closed',
      'team_descriptors.team_name',
      'postings.last_updated',
      'postings.id',
    )
    .from('postings')
    .innerJoin(
      'team_descriptors',
      'postings.team_id',
      '=',
      'team_descriptors.id',
    )
    .then((data) =>
      data.map(toPosting).map((posting) => ({
        ...posting,
        deadline: parseTimeForResponse(posting.deadline),
      })),
    );

const getActivePostings = (db) => () =>
  db
    .select('title', 'deadline', 'team_id', 'last_updated', 'id')
    .from('postings')
    .where('deadline', '>', new Date().getTime())
    .then((data) => data.map(toPosting));

const getActivePostingsWithTeamNames = (db) => () =>
  db
    .select(
      'postings.title',
      'postings.deadline',
      'team_descriptors.team_name',
      'postings.last_updated',
      'postings.id',
    )
    .from('postings')
    .innerJoin(
      'team_descriptors',
      'postings.team_id',
      '=',
      'team_descriptors.id',
    )
    .where('deadline', '>', new Date().getTime())
    .then((data) => data.map(toPosting));

const getPostingById = (db) => async (postingId, getTeamName) => {
  try {
    let query = getTeamName
      ? `SELECT postings.id AS id,
                        postings.title AS title,
                        postings.deadline AS deadline,
                        postings.last_updated AS last_updated,
                        postings.location AS location,
                        postings.term_year AS term_year,
                        postings.term_season AS term_season,
                        postings.description AS description,
                        postings.closed AS closed,
                        postings.time_commitment AS time_commitment,
                        team_descriptors.team_name AS team_name
                FROM postings
                INNER JOIN team_descriptors
                ON postings.team_id = team_descriptors.id
                WHERE postings.id = ?;
                `
      : `SELECT *
                FROM postings
                WHERE postings.id = ?;
                `;

    let posting = handleRawResponse(await db.raw(query, [postingId]));

    if (posting.length === 1) {
      posting = {
        ...posting[0],
        deadline: parseTimeForResponse(posting[0].deadline),
        last_updated: parseTimeForResponse(posting[0].last_updated),
      };
      const [
        requirements,
        tasks,
        info,
        recommendedSkills,
        skillsToBeLearned,
      ] = await Promise.all([
        getRequirementsByPostingId(db)(postingId),
        getTasksByPostingId(db)(postingId),
        getInfoByPostingId(db)(postingId),
        getRecommendedSkillsByPostingId(db)(postingId),
        getSkillsToBeLearnedByPostingId(db)(postingId),
      ]);
      return {
        ...toPosting(posting),
        requirements,
        tasks,
        info,
        skillsToBeLearned,
        recommendedSkills,
      };
    } else if (posting.length === 0) {
      return {};
    } else if (posting.length > 1) {
      throw new Error(`Multiple Postings with ID: ${postingId} found`);
    } else {
      console.log(posting);
      throw new Error('Received invalid posting');
    }
  } catch (err) {
    console.log('[getPostingsById]: ERROR');
    console.log(err);
    throw err;
  }
};

const getRequirementsByPostingId = (db) => (postingId) =>
  db('posting_requirements')
    .select('requirement', 'id')
    .where({ posting_id: postingId });

const getTasksByPostingId = (db) => (postingId) =>
  db('posting_tasks').select('task', 'id').where({ posting_id: postingId });

const getInfoByPostingId = (db) => (postingId) =>
  db('posting_info').select('info', 'id').where({
    posting_id: postingId,
  });

const getRecommendedSkillsByPostingId = (db) => (postingId) =>
  db('posting_recommended_skills')
    .select('recommended_skill', 'id')
    .where({
      posting_id: postingId,
    })
    .then(toRecommendedSkills);

const getSkillsToBeLearnedByPostingId = (db) => (postingId) =>
  db('posting_skills_to_be_learned')
    .select('skill_to_be_learned', 'id')
    .where({
      posting_id: postingId,
    })
    .then(toSkillsToBeLearned);

const insertPosting = (db) => (posting) =>
  db('postings').insert(
    {
      ...fromPosting(posting),
      closed: R.isNil(posting.closed) ? true : posting.closed,
      last_updated: parseTimeFromRequest(Date.now()),
    },
    ['id'],
  );

const insertPostingTasks = (db) => (postingId, tasks) =>
  tasks
    ? db('posting_tasks').insert(
        R.map(
          (task) => ({
            posting_id: postingId,
            task,
          }),
          tasks,
        ),
      )
    : Promise.resolve();

const insertPostingRequirements = (db) => (postingId, requirements) =>
  requirements
    ? db('posting_requirements').insert(
        R.map(
          (requirement) => ({
            posting_id: postingId,
            requirement,
          }),
          requirements,
        ),
      )
    : Promise.resolve();

const insertPostingInfo = (db) => (postingId, info) =>
  info
    ? db('posting_info').insert(
        R.map(
          (i) => ({
            posting_id: postingId,
            info: i,
          }),
          info,
        ),
      )
    : Promise.resolve();

const insertPostingRecommendedSkills = (db) => (postingId, recommendedSkills) =>
  recommendedSkills
    ? db('posting_recommended_skills').insert(
        R.map(
          (i) => ({
            posting_id: postingId,
            recommended_skill: i,
          }),
          fromRecommendedSkills(recommendedSkills),
        ),
      )
    : Promise.resolve();

const insertPostingSkillsToBeLearned = (db) => (postingId, skillsToBeLearned) =>
  skillsToBeLearned
    ? db('posting_skills_to_be_learned').insert(
        R.map(
          (i) => ({
            posting_id: postingId,
            skill_to_be_learned: i,
          }),
          fromSkillsToBeLearned(skillsToBeLearned),
        ),
      )
    : Promise.resolve();

const addPosting = (db) => async (posting) => {
  try {
    const {
      recommendedSkills,
      skillsToBeLearned,
      requirements,
      tasks,
      info,
      ...postingData
    } = posting;
    const response = await insertPosting(db)(postingData);
    if (response) {
      const [{ id: postingId }] = response;
      await Promise.all([
        insertPostingTasks(db)(postingId, tasks),
        insertPostingInfo(db)(postingId, info),
        insertPostingRequirements(db)(postingId, requirements),
        insertPostingRecommendedSkills(db)(postingId, recommendedSkills),
        insertPostingSkillsToBeLearned(db)(postingId, skillsToBeLearned),
      ]);

      return postingId;
    } else {
      throw new Error(`Invalid Response: response=${response}`);
    }
  } catch (err) {
    console.log('[addPosting]: ERROR');
    throw err;
  }
};

const deletePosting = (db) => (postingId) =>
  db('postings').where({ id: postingId }).del();

const updatePostingData = (db, postingId, postingData) =>
  db('postings').where({ id: postingId }).update(fromPosting(postingData));

const updatePostingRequirements = async (db, postingId, requirements) => {
  await db('posting_requirements').where({ posting_id: postingId }).del();

  await db('posting_requirements').insert(
    R.map(
      (requirement) => ({
        posting_id: postingId,
        requirement,
      }),
      requirements,
    ),
  );
};

const updatePostingInfo = async (db, postingId, info) => {
  await db('posting_info').where({ posting_id: postingId }).del();

  await db('posting_info').insert(
    R.map(
      (info) => ({
        posting_id: postingId,
        info,
      }),
      info,
    ),
  );
};

const updatePostingTasks = async (db, postingId, tasks) => {
  await db('posting_tasks').where({ posting_id: postingId }).del();

  await db('posting_tasks').insert(
    R.map(
      (task) => ({
        posting_id: postingId,
        task,
      }),
      tasks,
    ),
  );
};

const updatePostingRecommendedSkills = async (
  db,
  postingId,
  recommendedSkills,
) => {
  await db('posting_recommended_skills').where({ posting_id: postingId }).del();

  await db('posting_recommended_skills').insert(
    R.map(
      (recommendedSkill) => ({
        posting_id: postingId,
        recommended_skill: recommendedSkill,
      }),
      recommendedSkills,
    ),
  );
};

const updatePostingSkillsToBeLearned = async (
  db,
  postingId,
  skillsToBeLearned,
) => {
  await db('posting_skills_to_be_learned')
    .where({ posting_id: postingId })
    .del();

  await db('posting_skills_to_be_learned').insert(
    R.map(
      (skillToBeLearned) => ({
        posting_id: postingId,
        skill_to_be_learned: skillToBeLearned,
      }),
      skillsToBeLearned,
    ),
  );
};

const updatePosting = (db) => async (postingId, posting) => {
  const {
    recommendedSkills,
    skillsToBeLearned,
    requirements,
    tasks,
    info,
    ...postingData
  } = posting;
  postingData.lastUpdated = parseTimeFromRequest(new Date().getTime());

  const promises = [];
  !R.isNil(postingData) &&
    promises.push(updatePostingData(db, postingId, postingData));

  !R.isNil(requirements) &&
    requirements.length > 0 &&
    promises.push(updatePostingRequirements(db, postingId, requirements));

  !R.isNil(info) &&
    info.length > 0 &&
    promises.push(updatePostingInfo(db, postingId, info));

  !R.isNil(tasks) &&
    tasks.length > 0 &&
    promises.push(updatePostingTasks(db, postingId, tasks));

  !R.isNil(recommendedSkills) &&
    recommendedSkills.length > 0 &&
    promises.push(
      updatePostingRecommendedSkills(db, postingId, recommendedSkills),
    );

  !R.isNil(skillsToBeLearned) &&
    skillsToBeLearned.length > 0 &&
    promises.push(
      updatePostingSkillsToBeLearned(db, postingId, skillsToBeLearned),
    );

  return Promise.all(promises);
};

const addRequirementToPosting = (db) => async (postingId, requirement) => {
  const posting = await getPostingById(db)(postingId);
  if (isEmpty(posting))
    throw new Error(`posting with id: ${postingId} not found`);
  return db('posting_requirements').insert({
    posting_id: postingId,
    requirement,
  });
};

const addTaskToPosting = (db) => async (postingId, task) => {
  const posting = await getPostingById(db)(postingId);
  if (isEmpty(posting))
    throw new Error(`posting with id: ${postingId} not found`);
  return db('posting_tasks').insert({
    posting_id: postingId,
    task,
  });
};

const addInfoToPosting = (db) => async (postingId, info) => {
  const posting = await getPostingById(db)(postingId);
  if (isEmpty(posting))
    throw new Error(`posting with id: ${postingId} not found`);
  return db('posting_info').insert({
    posting_id: postingId,
    info,
  });
};

const addRecommendedSkillToPosting = (db) => async (
  postingId,
  recommendedSkill,
) => {
  const posting = await getPostingById(db)(postingId);
  if (isEmpty(posting))
    throw new Error(`posting with id: ${postingId} not found`);
  return db('posting_recommended_skills').insert({
    posting_id: postingId,
    recommended_skill: recommendedSkill,
  });
};

const addSkillToBeLearnedToPosting = (db) => async (
  postingId,
  skillToBeLearned,
) => {
  const posting = await getPostingById(db)(postingId);
  if (isEmpty(posting))
    throw new Error(`posting with id: ${postingId} not found`);
  return db('posting_skills_to_be_learned').insert({
    posting_id: postingId,
    skill_to_be_learned: skillToBeLearned,
  });
};

const deleteRequirementByReqId = (db) => async (requirementId) => {
  try {
    const response = await db('posting_requirements')
      .where({ id: requirementId })
      .del();

    console.log(response);
  } catch (err) {
    throw err;
  }
};

const deleteInfoByInfoId = (db) => async (infoId) => {
  try {
    const response = await db('posting_info').where({ id: infoId }).del();

    console.log(response);
  } catch (err) {
    throw err;
  }
};

const deleteTaskByTaskId = (db) => async (taskId) => {
  try {
    const response = await db('posting_tasks').where({ id: taskId }).del();

    console.log(response);
  } catch (err) {
    throw err;
  }
};

const deleteRecommendedSkillByRecId = (db) => async (recommendedSkillId) => {
  try {
    const response = await db('posting_recommended_skills')
      .where({ id: recommendedSkillId })
      .del();

    console.log(response);
  } catch (err) {
    throw err;
  }
};

const deleteSkillToBeLearnedBySkillId = (db) => async (skillToBeLearnedId) => {
  try {
    const response = await db('posting_skills_to_be_learned')
      .where({ id: skillToBeLearnedId })
      .del();

    console.log(response);
  } catch (err) {
    throw err;
  }
};

export default (db) => ({
  addInfoToPosting: addInfoToPosting(db),
  addPosting: addPosting(db),
  addRequirementToPosting: addRequirementToPosting(db),
  addTaskToPosting: addTaskToPosting(db),
  addRecommendedSkillToPosting: addRecommendedSkillToPosting(db),
  addSkillToBeLearnedToPosting: addSkillToBeLearnedToPosting(db),
  deletePosting: deletePosting(db),
  deleteInfoByInfoId: deleteInfoByInfoId(db),
  deleteRequirementByRegId: deleteRequirementByReqId(db),
  deleteTaskByTaskId: deleteTaskByTaskId(db),
  deleteRecommendedSkillByRecId: deleteRecommendedSkillByRecId(db),
  deleteSkillToBeLearnedBySkillId: deleteSkillToBeLearnedBySkillId(db),
  getActivePostings: getActivePostings(db),
  getActivePostingsWithTeamNames: getActivePostingsWithTeamNames(db),
  getInfoByPostingId: getInfoByPostingId(db),
  getRecommendedSkillsByPostingId: getRecommendedSkillsByPostingId(db),
  getSkillsToBeLearnedByPostingId: getSkillsToBeLearnedByPostingId(db),
  getPostingById: getPostingById(db),
  getPostings: getPostings(db),
  getPostingsWithTeamNames: getPostingsWithTeamNames(db),
  getRequirementsByPostingId: getRequirementsByPostingId(db),
  getTasksByPostingId: getTasksByPostingId(db),
  updatePosting: updatePosting(db),
});
