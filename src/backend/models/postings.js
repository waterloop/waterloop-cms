import * as R from 'ramda';
import renameProps from '../utils/rename-props';


export const fromPosting = (posting) => renameProps(posting, {
  termYear: 'term_year',
  termSeason: 'term_season',
  lastUpdated: 'last_updated',
  teamId: 'team_id',
  timeCommitment: 'time_commitment',
  teamName: 'team_name',
  recommendedSkills: 'recommended_skills',
  skillsToBeLearned: 'skills_to_be_learned'
});

export const toPosting = (postingRow) => renameProps(postingRow, {
  term_year: 'termYear',
  term_season: 'termSeason',
  last_updated: 'lastUpdated',
  team_id: 'teamId',
  time_commitment: 'timeCommitment',
  team_name: 'teamName',
  skills_to_be_learned: 'skillsToBeLearned',
  recommended_skills: 'recommendedSkills'
});

export const fromRecommendedSkills = (recommendedSkills) => R.map(
  (skill) => renameProps(skill, {
    recommendedSkill: 'recommended_skill'
  }),
  recommendedSkills
);

export const fromSkillsToBeLearned = (skillsToLearn) => R.map(
  (skill) => renameProps(skill, {
    skillToBeLearned: 'skill_to_be_learned'
  }),
  skillsToLearn
);

export const toRecommendedSkills = (recommendedSkills) => R.map(
  (skill) => renameProps(skill, {
    recommended_skill: 'recommendedSkill'
  }),
  recommendedSkills
);

export const toSkillsToBeLearned = (skillsToLearn) => R.map(
  (skill) => renameProps(skill, {
    skill_to_be_learned: 'skillToBeLearned'
  }),
  skillsToLearn
);
