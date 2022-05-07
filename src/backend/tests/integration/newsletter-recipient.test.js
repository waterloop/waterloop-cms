process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';
import { db } from '../../db';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

describe('Newsletter Routes', () => {
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
  after(async function() {
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    return db.migrate.rollback();
  });

  describe('GET /api/newsletter', () => {
    it('should return a list of all newsletter recipients when called', (done) => {
      chai
        .request(app)
        .get('/api/newsletter')
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(4);
          res.body.forEach((item) => {
            expect(item).to.have.keys(['id', 'email', 'name']);
          });
          done();
        });
    });
  });

  describe('GET /api/newsletter/:email', () => {
    it('should return the data for the newsletter recipient with the specified email', (done) => {
      chai
        .request(app)
        .get(
          '/api/newsletter/' +
            encodeURIComponent('john.doe.waterloop@gmail.com'),
        )
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property(
            'email',
            'john.doe.waterloop@gmail.com',
          );
          expect(res.body).to.have.property('name', 'John Doe');
          done();
        });
    });
    it('should return 404 for a non-existent newsletter recipient when called', (done) => {
      chai
        .request(app)
        .get('/api/newsletter/' + encodeURIComponent('non.existent@gmail.com'))
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('POST /api/newsletter', () => {
    it('should add a new newsletter recipient to the db', (done) => {
      chai
        .request(app)
        .post('/api/newsletter')
        .send({
          email: 'david.smith.waterloop@gmail.com',
          name: 'David Smith',
        })
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property(
            'email',
            'david.smith.waterloop@gmail.com',
          );
          expect(res.body).to.have.property('name', 'David Smith');
          chai
            .request(app)
            .get(
              '/api/newsletter/' +
                encodeURIComponent('david.smith.waterloop@gmail.com'),
            )
            .end((err, res2) => {
              if (res2.error.text) {
                console.error(res2.error.text);
              }
              expect(res2).to.have.status(200);
              expect(res2.body).to.be.an('object');
              expect(res2.body).to.have.property('id');
              expect(res2.body).to.have.property(
                'email',
                'david.smith.waterloop@gmail.com',
              );
              expect(res2.body).to.have.property('name', 'David Smith');
              done();
            });
        });
    });
    it('should trim body fields before adding a new newsletter recipient to the db', (done) => {
      chai
        .request(app)
        .post('/api/newsletter')
        .send({
          email: '  jessica.thompson.waterloop@waterloop.ca  ',
          name: '  Jessica Thompson  ',
        })
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property(
            'email',
            'jessica.thompson.waterloop@waterloop.ca',
          );
          expect(res.body).to.have.property('name', 'Jessica Thompson');
          chai
            .request(app)
            .get(
              '/api/newsletter/' +
                encodeURIComponent('jessica.thompson.waterloop@waterloop.ca'),
            )
            .end((err, res2) => {
              if (res2.error.text) {
                console.error(res2.error.text);
              }
              expect(res2).to.have.status(200);
              expect(res2.body).to.be.an('object');
              expect(res2.body).to.have.property('id');
              expect(res2.body).to.have.property(
                'email',
                'jessica.thompson.waterloop@waterloop.ca',
              );
              expect(res2.body).to.have.property('name', 'Jessica Thompson');
              done();
            });
        });
    });
    it('should return 400 with no input supplied', (done) => {
      chai
        .request(app)
        .post('/api/newsletter')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return 400 with undefined email and name supplied', (done) => {
      chai
        .request(app)
        .post('/api/newsletter')
        .send({
          email: undefined,
          name: undefined,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return 400 with empty email and name supplied', (done) => {
      chai
        .request(app)
        .post('/api/newsletter')
        .send({
          email: '',
          name: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return 400 with empty email supplied', (done) => {
      chai
        .request(app)
        .post('/api/newsletter')
        .send({
          email: '',
          name: 'Jason Bourne',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return 400 with empty name supplied', (done) => {
      chai
        .request(app)
        .post('/api/newsletter')
        .send({
          email: 'jason.bourne.waterloop@gmail.com',
          name: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return 400 with an invalid email supplied', (done) => {
      chai
        .request(app)
        .post('/api/newsletter')
        .send({
          email: 'jasonbournewaterloopgmail.com',
          name: 'Jason Bourne',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('DELETE /api/newsletter/:email', () => {
    it('should remove the user with the specified email from the database', (done) => {
      chai
        .request(app)
        .del(
          '/api/newsletter/' +
            encodeURIComponent('john.doe.waterloop@gmail.com'),
        )
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          chai
            .request(app)
            .get(
              '/api/newsletter/' +
                encodeURIComponent('john.doe.waterloop@gmail.com'),
            )
            .end((err, res2) => {
              if (res2.error.text) {
                console.error(res2.error.text);
              }
              expect(res2).to.have.status(404);
              done();
            });
        });
    });
  });
});
