import * as PostingsModel from '../../models/postings';
import chai from 'chai';
const expect = chai.expect;

const postingCamel = {
  "title": "title",
  "teamId": 1,
  "deadline": 16000,
  "location": "inperson",
  "termYear": 2020,
  "termSeason": "Fall",
  "description": "Term description",
  timeCommitment: '8-10 Hours a Week',
  "requirements": [
    "req 1",
    "req 2"
  ],
  "info": [
    "info 1",
    "info 2"
  ],
  "tasks": [
    "task 1",
    "task 2"
  ],
  "recommendedSkills": [
    "1",
    "2"
  ],
  "skillsToBeLearned": [
    "1",
    "2"
  ],
}

const postingSnake = {
  "title": "title",
  "team_id": 1,
  "deadline": 16000,
  "location": "inperson",
  "term_year": 2020,
  "term_season": "Fall",
  "description": "Term description",
  "time_commitment": '8-10 Hours a Week',
  "requirements": [
    "req 1",
    "req 2"
  ],
  "info": [
    "info 1",
    "info 2"
  ],
  "tasks": [
    "task 1",
    "task 2"
  ],
  "recommended_skills": [
    "1",
    "2"
  ],
  "skills_to_be_learned": [
    "1",
    "2"
  ],
}

describe('Model: Posting', () => {
  describe('fromPosting', () => {
    it('should return a new object with keys that are snake case', () => {
      expect(PostingsModel.fromPosting(postingCamel)).to.deep.equal(postingSnake);
    })
  })
  describe('toPosting', () => {
    it('should return a new object with keys that are camel case', () => {
      expect(PostingsModel.toPosting(postingSnake)).to.deep.equal(postingCamel);
    })
  })
})
