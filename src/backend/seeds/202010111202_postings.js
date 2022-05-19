const R = require('ramda');
const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');
const { parseTimeFromRequest } = require('../utils/db-dates');

const Posting = (id, date, team_id) => ({
  title: 'Front End developer',
  team_id: team_id,
  deadline: parseTimeFromRequest(date),
  location: 'on campus',
  term_year: '2020',
  term_season: 'WINTER',
  closed: true,
  description: 'Description of the Posting',
  last_updated: parseTimeFromRequest(date),
  time_commitment: '8-10 Hours a Week',
});

const Requirement = (id, postingId) => ({
  posting_id: postingId,
  requirement: `This is a Requirement - ${id}`,
});

const Task = (id, postingId) => ({
  posting_id: postingId,
  task: `Example Task: Have fun! - ${id}/${postingId}`,
});

const Info = (id, postingId) => ({
  posting_id: postingId,
  info: `Example Info about the posting: - ${id}/${postingId}`,
});

const RecommendedSkill = (id, postingId) => ({
  posting_id: postingId,
  recommended_skill: `Example recommended skill about the posting: - ${id}/${postingId}`,
});

const SkillToBeLearned = (id, postingId) => ({
  posting_id: postingId,
  skill_to_be_learned: `Example skill to be learned about the posting: - ${id}/${postingId}`,
});

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = (knex) =>
    knex('postings')
      .del()
      .then(async () => {
        const teams = await knex('team_descriptors');
        return knex('postings').insert([
          ...R.map(
            (id) =>
              Posting(id, new Date('Feb 1, 2020').setDate(28), teams[0].id),
            R.range(0, 20),
          ),
          ...R.map(
            (id) =>
              Posting(id, new Date('Feb 1, 2020').setMonth(1), teams[0].id),
            R.range(21, 45),
          ),
        ]);
      })
      .then(() => knex('posting_requirements').del())
      .then(async () => {
        const postings = await knex('postings');
        return knex('posting_requirements').insert(
          R.map(
            (i) => Requirement(i, (i % 3) + postings[0].id),
            R.range(0, 10),
          ),
        );
      })
      .then(() => knex('posting_tasks').del())
      .then(async () => {
        const postings = await knex('postings');
        return knex('posting_tasks').insert(
          R.map((i) => Task(i, (i % 3) + postings[0].id), R.range(0, 10)),
        );
      })
      .then(() => knex('posting_info').del())
      .then(async () => {
        const postings = await knex('postings');
        return knex('posting_info').insert(
          R.map((i) => Info(i, (i % 3) + postings[0].id), R.range(0, 10)),
        );
      })
      .then(() => knex('posting_recommended_skills').del())
      .then(async () => {
        const postings = await knex('postings');
        return knex('posting_recommended_skills').insert(
          R.map(
            (i) => RecommendedSkill(i, (i % 3) + postings[0].id),
            R.range(0, 10),
          ),
        );
      })
      .then(() => knex('posting_skills_to_be_learned').del())
      .then(async () => {
        const postings = await knex('postings');
        return knex('posting_skills_to_be_learned').insert(
          R.map(
            (i) => SkillToBeLearned(i, (i % 3) + postings[0].id),
            R.range(0, 10),
          ),
        );
      });
} else {
  exports.seed = function (knex) {
    return Promise.resolve();
  };
}
