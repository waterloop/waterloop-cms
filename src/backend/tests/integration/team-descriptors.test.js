process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

describe('Team Descriptor Routes', () => {
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
  after(async function () {
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    return db.migrate.rollback();
  });

  describe('GET /api/team-descriptors', () => {
    it('should return a list of teams when called', (done) => {
      chai
        .request(app)
        .get('/api/team-descriptors')
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.forEach((item) => {
            expect(item).to.have.keys(['id', 'teamName', 'description']);
          });
          done();
        });
    });
  });

  /* TEAMS API ENDPOINT */

  describe('POST /api/team-descriptors', () => {
    it('should add a team descriptor to the db with a well formed input', (done) => {
      chai
        .request(app)
        .post('/api/team-descriptors')
        .send({
          teamName: 'A new Team',
          description: 'test-description',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          const [newId] = res.body;
          chai
            .request(app)
            .get('/api/team-descriptors')
            .end((err, res2) => {
              expect(res2).to.have.status(200);
              res2.body.forEach((item) => {
                expect(item).to.have.keys(['id', 'teamName', 'description']);
              });
              console.log(res2.body);
              expect(res2.body).to.deep.include({
                id: newId,
                teamName: 'A new Team',
                description: 'test-description',
              });
              done();
            });
        });
    });

    it('should return 400 with a poorly formed input', (done) => {
      chai
        .request(app)
        .post('/api/team-descriptors')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('DELETE /api/team-descriptors/:id', () => {
    it('should delete an item with "id" that exists', (done) => {
      chai
        .request(app)
        .del('/api/team-descriptors/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          chai
            .request(app)
            .get('/api/team-descriptors')
            .end((err2, res2) => {
              expect(res2).to.have.status(200);
              res2.body.forEach((item) => {
                expect(item.id).to.not.eql(1);
              });
              done();
            });
        });
    });

    it('should return 404 when an id is not provided', (done) => {
      chai
        .request(app)
        .del('/api/team-descriptors')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should continue if the id does not exist', (done) => {
      chai
        .request(app)
        .del('/api/team-descriptors/22')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('PATCH /api/team-descriptors/:id', () => {
    it('should update the entry with "id" to match the new body', async () => {
      const teams = await db('team_descriptors');
      return chai
        .request(app)
        .patch(`/api/team-descriptors/${teams[0].id}`)
        .send({
          teamName: 'An updated Team',
          description: 'An updated Team description',
        })
        .then((res) => {
          expect(res).to.have.status(200);
          return chai
            .request(app)
            .get('/api/team-descriptors')
            .then((res2) => {
              console.log('res2', res2.body);
              expect(res2).to.have.status(200);
              const patchedItem = res2.body.find(
                (item) => item.id === teams[0].id,
              );
              expect(patchedItem).to.have.property(
                'teamName',
                'An updated Team',
              );
              expect(patchedItem).to.have.property(
                'description',
                'An updated Team description',
              );
            });
        });
    });

    it('should return 404 if an id is not provided', (done) => {
      chai
        .request(app)
        .patch('/api/team-descriptors')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should return 400 when body is missing a description', (done) => {
      chai
        .request(app)
        .patch('/api/team-descriptors/1')
        .send({
          teamName: '1',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should return 400 when body is missing a teamName', (done) => {
      chai
        .request(app)
        .patch('/api/team-descriptors/1')
        .send({
          description: '1',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should return 400 when body is missing', (done) => {
      chai
        .request(app)
        .patch('/api/team-descriptors/1')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  /* TEAMS DESCRIPTION API ENDPOINT */

  describe('GET /api/team-descriptors/description', () => {
    it('should return page description entries when called', (done) => {
      chai
        .request(app)
        .get('/api/team-descriptors/description')
        .end((err, res) => {
          expect(res).to.have.status(200);
          if (res.error.text) {
            console.error(res.error.text);
          }
          const teamDescription = res.body;
          expect(teamDescription).to.have.keys([
            'title',
            'description',
            'images',
            'updatedAt',
            'createdAt',
          ]);
          done();
        });
    });
  });

  describe('PATCH /api/team-descriptors/description', () => {
    it('should update page description entries when called', (done) => {
      chai
        .request(app)
        .patch('/api/team-descriptors/description')
        .send({
          title: 'This is a title updated',
          description: 'This is a description updated',
          images: ['image1.png', 'image2.png', 'image3.png'],
        })
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);

          chai
            .request(app)
            .get('/api/team-descriptors/description')
            .end((err2, res2) => {
              expect(res2).to.have.status(200);
              if (res2.error.text) {
                console.error(res2.error.text);
              }

              expect(res2.body).to.have.property('updatedAt');
              expect(res2.body).to.have.property('createdAt');
              expect(res2.body).to.deep.include({
                title: 'This is a title updated',
                description: 'This is a description updated',
                images: ['image1.png', 'image2.png', 'image3.png'],
              });
              done();
            });
        });
    });

    it('should return 400 when body is missing', (done) => {
      chai
        .request(app)
        .patch('/api/team-descriptors/description')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should return 400 when body is incomplete', (done) => {
      chai
        .request(app)
        .patch('/api/team-descriptors/description')
        .send({
          title: 'This is a title updated',
          images: ['image1.png', 'image2.png', 'image3.png'],
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
