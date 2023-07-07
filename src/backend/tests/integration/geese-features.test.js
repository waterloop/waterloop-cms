import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);
const { expect } = chai;

describe('Geese Feature Routes', () => {
  // Rollback migrations.
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

  describe('GET /api/geese-features/', () => {
    it('should return a list of geese info when called', (done) => {
      chai
        .request(app)
        .get('/api/geese-features/')
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
            done(res.error.text);
          }
          expect(res).to.have.status(200);
          res.body.features.forEach((item) => {
            expect(item).to.have.keys(['id', 'name', 'description', 'picture']);
          });
          done();
        });
    });
  });

  describe('GET /api/geese-features/:id', () => {
    it('should return a goose feature with specific ID when called', async () => {
      const geese = await db('geese_features');
      return chai
        .request(app)
        .get(`/api/geese-features/${geese[0].id}`)
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys([
            'id',
            'name',
            'description',
            'picture',
          ]);
        });
    });
    it('should return 404 for a non-existent feature when called', (done) => {
      chai
        .request(app)
        .get('/api/geese-features/9001')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('POST /api/geese-features/', () => {
    it('should add a goose feature to the db with a well formed input', (done) => {
      chai
        .request(app)
        .post('/api/geese-features/')
        .send({
          name: 'Feature X',
          description: 'The up and coming Feature X available Feb 30, 2999',
          picture: 'this is a picture url',
        })
        .end((err, res) => {
          if (res.error.text) {
            console.error('ERROR', res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.have.length(1);
          chai
            .request(app)
            .get(`/api/geese-features/${res.body[0].id}`)
            .end((err, res) => {
              if (res.error.text) {
                console.error(res.error.text);
              }
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('id');
              expect(res.body).to.have.property(
                'description',
                'The up and coming Feature X available Feb 30, 2999',
              );
              expect(res.body).to.have.property('name', 'Feature X');
              expect(res.body).to.have.property(
                'picture',
                'this is a picture url',
              );
              done();
            });
        });
    });

    it('should return 400 with no input supplied', (done) => {
      chai
        .request(app)
        .post('/api/geese-features/')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return 400 with some required inputs not provided', (done) => {
      chai
        .request(app)
        .post('/api/geese-features/')
        .send({
          name: 'Tesla Inc.',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('PATCH /api/geese-features/:id', () => {
    it('should update the entry with "id" to match the new body', async () => {
      const geese = await db('geese_features');
      return chai
        .request(app)
        .patch(`/api/geese-features/${geese[0].id}`)
        .send({
          name: 'Feature MMXXI',
          description: 'new description!',
        })
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          return chai
            .request(app)
            .get(`/api/geese-features/${geese[0].id}`)
            .then((res2) => {
              if (res2.error.text) {
                console.error(res.error.text);
              }
              expect(res2).to.have.status(200);
              expect(res2.body).to.have.property('id', geese[0].id);
              expect(res2.body).to.have.property('name', 'Feature MMXXI');
              expect(res2.body).to.have.property(
                'description',
                'new description!',
              );
              expect(res2.body).to.have.property('picture');
            });
        });
    });

    it('should return 404 if an id is not provided', (done) => {
      chai
        .request(app)
        .patch('/api/geese-features/')
        .send({
          name: 'Feature MMXXI',
          description: 'new description!',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should return 500 when body is missing', (done) => {
      chai
        .request(app)
        .patch('/api/geese-features/1')
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
  });

  describe('DELETE /api/geese-features/:id', () => {
    it('should delete a goose feature entry with "id" that exists', async () => {
      const geese = await db('geese_features');
      chai
        .request(app)
        .del(`/api/geese-features/${geese[0].id}`)
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          chai
            .request(app)
            .get(`/api/geese-features/${geese[0].id}`)
            .then((res2) => {
              if (res2.error.text) {
                console.error(res2.error.text);
              }
              expect(res).to.have.status(404);
            });
        });
    });

    it('should return 404 when an id is not provided', (done) => {
      chai
        .request(app)
        .del('/api/geese-features/')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should return 404 if the id does not exist', (done) => {
      chai
        .request(app)
        .del('/api/geese-features/987654321')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
