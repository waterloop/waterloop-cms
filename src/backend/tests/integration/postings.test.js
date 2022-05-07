process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';
import postings from '../../db/postings';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

describe('Postings Routes', () => {

  before('migrate', async function () {
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    await db.migrate.rollback();
    return db.migrate.latest();
  });

  beforeEach('reseed', async function () {
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    return db.seed.run();
  });

  // Rollback migration again.
  after(async function() {
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    return db.migrate.rollback();
  });

  describe('GET /api/postings/:id', () => {
    it('should return a list of postings when id is not given', done => {
      chai
        .request(app)
        .get('/api/postings')
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.forEach((item) => {
            expect(item).to.have.keys([
              'title',
              'closed',
              'teamId',
              'id',
              'lastUpdated',
              'deadline'
            ]);
          })
          done();
        });
    });

    it('should return a list of postings with names of teams when joinTeamName=true', done => {
      chai
        .request(app)
        .get('/api/postings?joinTeamName=true')
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.forEach((item) => {
            expect(item).to.have.keys([
              'title',
              'closed',
              'teamName',
              'id',
              'lastUpdated',
              'deadline'
            ]);
          });
          done();
        });
    });

    it('should return details about a posting when id is supplied and that id exists', async () => {
      const postings = await db('postings');
      return chai
        .request(app)
        .get(`/api/postings/${postings[0].id}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys([
            'title',
            'closed',
            'teamId',
            'id',
            'lastUpdated',
            'deadline',
            'location',
            'termYear',
            'termSeason',
            'description',
            'timeCommitment',
            'requirements',
            'tasks',
            'info',
            'recommendedSkills',
            'skillsToBeLearned'
          ]);
        });
    });

    it('should return details about a posting when id is supplied. Should return name of team when joinTeamName=true', async () => {
      const postings = await db('postings');
      return chai
        .request(app)
        .get(`/api/postings/${postings[0].id}?joinTeamName=true`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys([
            'title',
            'closed',
            'teamName',
            'id',
            'lastUpdated',
            'deadline',
            'location',
            'termYear',
            'termSeason',
            'description',
            'timeCommitment',
            'requirements',
            'tasks',
            'info',
            'recommendedSkills',
            'skillsToBeLearned'
          ]);
        });
    });

    it('should return 404 when a posting with the id doesn\'t exist', done => {
      chai
        .request(app)
        .get('/api/postings/10000')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('POST /api/postings', () => {
    it('should add a posting to the db with a well formed input', async () => {
      const teams = await db('team_descriptors');
      return chai.request(app)
        .post('/api/postings')
        .send({
          "title": "title",
          "teamId": teams[0].id,
          "deadline": 16000,
          "location": "inperson",
          "termYear": 2020,
          "termSeason": "Fall",
          "description": "Term description",
          "timeCommitment": "8-10 Hours a Week",
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
            "skill 1",
            "skill 2",
          ],
          "skillsToBeLearned": [
            "skill 1",
            "skill 2",
          ],
        })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
        });
    });

    it('should return 400 with a poorly formed input', done => {
      chai.request(app)
        .post('/api/postings')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('DELETE /api/postings/:id', () => {
    it('should delete an item with "id" that exists', async () => {
      const postings = await db('postings');
      return chai.request(app)
        .del(`/api/postings/${postings[0].id}`)
        .then((res) => {
          expect(res).to.have.status(200);
          return chai.request(app)
            .get('/api/postings')
            .then((res2) => {
              expect(res2).to.have.status(200);
              res2.body.forEach((item) => {
                expect(item.id).to.not.equal(postings[0].id);
              })
            });
        });
    });

    it('should return 404 when an id is not provided', done => {
      chai.request(app)
        .del('/api/postings')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should return 404 if the id does not exist', done => {
      chai.request(app)
        .del('/api/postings/222222')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('PATCH /api/postings/:id', () => {
    it('should update the entry with "id" to match the new body', async () => {
      const postings = await db('postings');
      const requirements = await db('posting_requirements').where({ posting_id: postings[0].id });
      const info = await db('posting_info').where({ posting_id: postings[0].id });
      const tasks = await db('posting_tasks').where({ posting_id: postings[0].id });
      const recommendedSkills = await db('posting_recommended_skills').where({ posting_id: postings[0].id });
      const skillsToBeLearned = await db('posting_skills_to_be_learned').where({ posting_id: postings[0].id });

      return chai.request(app)
        .patch(`/api/postings/${postings[0].id}`)
        .send({
          "title": "title",
          "teamId": postings[0].team_id,
          "deadline": 16000,
          "location": "inperson",
          "termYear": 2020,
          "termSeason": "Fall",
          "description": "Term description",
          "closed": false,
          "requirements": [
            { id: requirements[0].id, requirement: "req 1" },
            { id: requirements[1].id, requirement: "req 2" },
            { id: requirements[2].id, requirement: "req 3" },
          ],
          "info": [
            { id: info[0].id, info: "info 1" },
            { id: info[1].id, info: "info 2" },
            { id: info[2].id, info: "info 3" },
          ],
          "tasks": [
            { id: tasks[0].id, task: "task 1" },
            { id: tasks[1].id, task: "task 2" },
            { id: tasks[2].id, task: "task 3" }
          ],
          "recommendedSkills": [
            { id: recommendedSkills[0].id, recommendedSkill: "skill 1" },
            { id: recommendedSkills[1].id, recommendedSkill: "skill 2" },
            { id: recommendedSkills[2].id, recommendedSkill: "skill 3" }
          ],

          "skillsToBeLearned": [
            { id: skillsToBeLearned[0].id, skillToBeLearned: "skill 1" },
            { id: skillsToBeLearned[1].id, skillToBeLearned: "skill 2" },
            { id: skillsToBeLearned[2].id, skillToBeLearned: "skill 3" }
          ],

        })
        .then((res) => {
          expect(res).to.have.status(200);
          return chai.request(app)
            .get(`/api/postings/${postings[0].id}`)
            .then((res2) => {
              expect(res2).to.have.status(200);
              expect(res2.body).to.have.property('deadline');
              expect(res2.body).to.have.property('lastUpdated');
              expect(res2.body).to.have.property('id', postings[0].id);
              expect(res2.body).to.have.property('title', 'title');
              expect(res2.body).to.have.property('teamId', postings[0].team_id);
              expect(res2.body).to.have.property('location', 'inperson');
              expect(res2.body).to.have.property('termYear', 2020);
              expect(res2.body).to.have.property('termSeason', 'Fall');
              expect(res2.body).to.have.property('description', 'Term description');
              expect(res2.body).to.have.property('timeCommitment', '8-10 Hours a Week');
              expect(res2.body).to.have.property('closed', false);
              expect(res2.body).to.have.property('requirements');
              expect(res2.body).to.have.property('tasks');
              expect(res2.body).to.have.property('info');
              expect(res2.body.requirements).to.include.deep.members([
                { id: requirements[0].id, requirement: "req 1" },
                { id: requirements[1].id, requirement: "req 2" },
                { id: requirements[2].id, requirement: "req 3" },
              ]);
              expect(res2.body.tasks).to.include.deep.members([
                { id: tasks[0].id, task: "task 1" },
                { id: tasks[1].id, task: "task 2" },
                { id: tasks[2].id, task: "task 3" },
              ]);
              expect(res2.body.info).to.include.deep.members([
                { id: info[0].id, info: "info 1" },
                { id: info[1].id, info: "info 2" },
                { id: info[2].id, info: "info 3" },
              ]);
              expect(res2.body.skillsToBeLearned).to.include.deep.members([
                { id: skillsToBeLearned[0].id, skillToBeLearned: "skill 1" },
                { id: skillsToBeLearned[1].id, skillToBeLearned: "skill 2" },
                { id: skillsToBeLearned[2].id, skillToBeLearned: "skill 3" }
              ]);
              expect(res2.body.recommendedSkills).to.include.deep.members([
                { id: recommendedSkills[0].id, recommendedSkill: "skill 1" },
                { id: recommendedSkills[1].id, recommendedSkill: "skill 2" },
                { id: recommendedSkills[2].id, recommendedSkill: "skill 3" }
              ]);
            });
          });
        });

    it('should return 404 if an id is not provided', async () => {
      return chai.request(app)
        .patch('/api/postings')
        .then((res) => {
          expect(res).to.have.status(404);
        });
    });

    it('should return 400 when body is missing', async () => {
      const postings = await db('postings');
      return chai
        .request(app)
        .patch(`/api/postings/${postings[0].id}`)
        .then((res) => {
          expect(res).to.have.status(400);
        });
    });
  });

  describe('POST /api/postings/:id/requirement', () => {
    it('Should return the requirements array with a new entry when called correctly', async () => {
      const postings = await db('postings');
      return chai
        .request(app)
        .get(`/api/postings/${postings[0].id}`)
        .then((preRes) => {
          return chai
          .request(app)
          .post(`/api/postings/${postings[0].id}/requirement`)
          .send({})
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body.length).to.equal(preRes.body.requirements.length + 1);
            res.body.forEach(item => {
              expect(item).to.have.keys([
                'requirement',
                'id'
              ]);
            });
          });
        })
    });

    it('Should return 404 if a posting with id is not found', done => {
      chai
        .request(app)
        .post('/api/postings/100000/requirement')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('POST /api/postings/:id/task', () => {
    it('Should return the tasks array with a new entry when called correctly', async () => {
      const postings = await db('postings');
      return chai
        .request(app)
        .get(`/api/postings/${postings[0].id}`)
        .then((preRes) => {
          return chai
          .request(app)
          .post(`/api/postings/${postings[0].id}/task`)
          .send({})
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body.length).to.equal(preRes.body.tasks.length + 1);
            res.body.forEach(item => {
              expect(item).to.have.keys([
                'task',
                'id'
              ]);
            });
          });
        })
    });

    it('Should return 404 if a posting with id is not found', done => {
      chai
        .request(app)
        .post('/api/postings/100000/task')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('POST /api/postings/:id/info', () => {
    it('Should return the info array with a new entry when called correctly', async () => {
      const postings = await db('postings');
      return chai
        .request(app)
        .get(`/api/postings/${postings[0].id}`)
        .then((preRes) => {
          return chai
          .request(app)
          .post(`/api/postings/${postings[0].id}/info`)
          .send({})
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body.length).to.equal(preRes.body.info.length + 1);
            res.body.forEach(item => {
              expect(item).to.have.keys([
                'info',
                'id'
              ]);
            });
          });
        })
    });

    it('Should return 404 if a posting with id is not found', done => {
      chai
        .request(app)
        .post('/api/postings/100000/info')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('POST /api/postings/:id/recommendedSkill', () => {
    it('Should return the recommended skills array with a new entry when called correctly', async () => {
      const postings = await db('postings');
      return chai
        .request(app)
        .get(`/api/postings/${postings[0].id}`)
        .then((preRes) => {
          return chai
          .request(app)
          .post(`/api/postings/${postings[0].id}/recommendedSkill`)
          .send({})
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body.length).to.equal(preRes.body.info.length + 1);
            res.body.forEach(item => {
              expect(item).to.have.keys([
                'recommendedSkill',
                'id'
              ]);
            });
          });
        })
    });

    it('Should return 404 if a posting with id is not found', done => {
      chai
        .request(app)
        .post('/api/postings/100000/recommendedSkill')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('POST /api/postings/:id/skillToBeLearned', () => {
    it('Should return the skills to be learned array with a new entry when called correctly', async () => {
      const postings = await db('postings');
      return chai
        .request(app)
        .get(`/api/postings/${postings[0].id}`)
        .then((preRes) => {
          return chai
          .request(app)
          .post(`/api/postings/${postings[0].id}/skillToBeLearned`)
          .send({
            skillToBeLearned: 'skill that the member will learn'
          })
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body.length).to.equal(preRes.body.info.length + 1);
            res.body.forEach(item => {
              expect(item).to.have.keys([
                'skillToBeLearned',
                'id'
              ]);
            });
          });
        })
    });

    it('Should return 404 if a posting with id is not found', done => {
      chai
        .request(app)
        .post('/api/postings/100000/skillToBeLearned')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('DELETE /api/postings/:postingId/requirement/:requirementId', () => {
    it('should delete the requirement if it exists', async () => {
      const posting = await db('postings').first();
      const requirements = await db('posting_requirements').where({posting_id: posting.id});
      return chai
        .request(app)
        .del(`/api/postings/${posting.id}/requirement/${requirements[0].id}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
        })
    });
  });

  describe('DELETE /api/postings/:postingId/task/:taskId', () => {
    it('should delete the task if it exists', async () => {
      const posting = await db('postings').first();
      const tasks = await db('posting_tasks').where({posting_id: posting.id});
      return chai
        .request(app)
        .del(`/api/postings/${posting.id}/task/${tasks[0].id}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
        })
    });
  });

  describe('DELETE /api/postings/:postingId/info/:infoId', () => {
    it('should delete the info if it exists', async () => {
      const posting = await db('postings').first();
      const info = await db('posting_info').where({posting_id: posting.id});
      return chai
        .request(app)
        .del(`/api/postings/${posting.id}/info/${info[0].id}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
        })
    });
  });

  describe('DELETE /api/postings/:postingId/info/:infoId', () => {
    it('should delete the info if it exists', async () => {
      const posting = await db('postings').first();
      const info = await db('posting_info').where({posting_id: posting.id});
      return chai
        .request(app)
        .del(`/api/postings/${posting.id}/info/${info[0].id}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
        })
    });
  });

  describe('DELETE /api/postings/:postingId/skillToBeLearned/:skillToBeLearnedId', () => {
    it('should delete the info if it exists', async () => {
      const posting = await db('postings').first();
      const skillsToBeLearned = await db('posting_skills_to_be_learned').where({posting_id: posting.id});
      return chai
        .request(app)
        .del(`/api/postings/${posting.id}/skillToBeLearned/${skillsToBeLearned[0].id}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
        })
    });
  });

  describe('DELETE /api/postings/:postingId/recommendedSkill/:recommendedSkillId', () => {
    it('should delete the info if it exists', async () => {
      const posting = await db('postings').first();
      const recommendedSkills = await db('posting_recommended_skills').where({posting_id: posting.id});
      return chai
        .request(app)
        .del(`/api/postings/${posting.id}/recommendedSkill/${recommendedSkills[0].id}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
        })
    });
  });
});
