process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

describe('Sponsor Routes', () => {
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

  /**SPONSOR TIERS API ENDPOINT */
  describe('GET /api/sponsors/tiers', () => {
    it('should return a list of sponsor tiers when called', done => {
      chai
        .request(app)
        .get('/api/sponsors/tiers')
        .end((err, res) => {
          expect(res).to.have.status(200);
          if (res.error.text) {
            console.error(res.error.text);
          }
          res.body.map(item => {
            expect(item).to.have.keys([
              'id',
              'type'
            ]);
          });
          done();
        });
    });
  });

  /**SPONSORS API ENDPOINT */
  describe('GET /api/sponsors/', () => {
    it('should return a list of sponsors when called', done => {
      chai
        .request(app)
        .get('/api/sponsors/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          if (res.error.text) {
            console.error(res.error.text);
          }
          res.body.forEach((member) => {
            expect(member).to.have.keys([
              'id',
              'name',
              'typeId',
              'joinDate',
              'website',
              'contributions',
              'youtube',
              'logoDir',
              'createdAt',
              'updatedAt'
            ]);
          });
          done();
        });
    });
  });

  describe('GET /api/sponsors?joinTierName=true', () => {
    it('should return a list of sponsors when called', done => {
      chai
        .request(app)
        .get('/api/sponsors?joinTierName=true')
        .end((err, res) => {
          expect(res).to.have.status(200);
          if (res.error.text) {
            console.error(res.error.text);
          }
          res.body.forEach((member) => {
            expect(member).to.have.keys([
              'id',
              'name',
              'type',
              'joinDate',
              'website',
              'contributions',
              'youtube',
              'logoDir',
            ]);
          });
          done();
        });
    });
  });

  describe('POST /api/sponsors', () => {
    it('should add a sponsor to the db with a well formed input', async () => {
      const sponsorTiers = await db('sponsor_tiers');
      return chai.request(app)
        .post('/api/sponsors')
        .send({
          name: 'Tesla Inc.',
          typeId: sponsorTiers[0].id,
          joinDate: 1609518840000,
          website: "hello world",
          contributions: null
        })
        .then((res) => {
          expect(res).to.have.status(200);
          const [newId] = res.body;
          return chai.request(app)
            .get('/api/sponsors/')
            .then((res2) => {
              expect(res2).to.have.status(200);
              if (res.error.text) {
                console.error(res2.error.text);
              }
              res2.body.forEach((sponsor) => {
                expect(sponsor).to.have.keys([
                  'name',
                  'typeId',
                  'joinDate',
                  'contributions',
                  'logoDir',
                  'youtube',
                  'website',
                  'id',
                  'updatedAt',
                  'createdAt'
                ]);
                if (sponsor.id === newId) {
                  expect(sponsor).to.have.property('name', 'Tesla Inc.')
                  expect(sponsor).to.have.property('typeId', sponsorTiers[0].id)
                  expect(sponsor).to.have.property('joinDate')
                  expect(sponsor).to.have.property('website', 'hello world')
                  expect(sponsor).to.have.property('contributions', null)
                }
              });
            });
        });
    });

    it('should return 400 with no input supplied', done => {
      chai.request(app)
        .post('/api/sponsors')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should return 400 with some required inputs not provided', done => {
      chai.request(app)
        .post('/api/sponsors')
        .send({
          name: 'Tesla Inc.',
          typeId: 1,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('PATCH /api/sponsors/:id', () => {
    it('should update the entry with "id" to match the new body', async () => {
      const sponsors = await db('sponsors');
      return chai.request(app)
        .patch(`/api/sponsors/${sponsors[0].id}`)
        .send({
          name: 'example',
          typeId: sponsors[1].type_id,
          website: "example.co"
        })
        .then((res) => {
          expect(res).to.have.status(200);
          return chai.request(app)
            .get('/api/sponsors/')
            .then((res2) => {
              expect(res2).to.have.status(200);
              if (res2.error.text) {
                console.error(res2.error.text);
              }
              let idFound = false;
              res2.body.forEach((item) => {
                expect(item).to.have.keys([
                  'name',
                  'typeId',
                  'joinDate',
                  'contributions',
                  'logoDir',
                  'youtube',
                  'website',
                  'id',
                  'createdAt',
                  'updatedAt',
                ]);
                if (item.id === sponsors[0].id) {
                  idFound = true;
                  expect(item).to.have.property('name', 'example')
                  expect(item).to.have.property('typeId', sponsors[1].type_id)
                  expect(item).to.have.property('website', 'example.co')
                }
              })
              expect(idFound).to.be.true;
            });
        })
    })

    it('should return 404 if an id is not provided', done => {
      chai.request(app)
        .patch('/api/sponsors')
        .send({
          name: 'example',
          typeId: 2,
          website: "example.co"
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should return 400 when body is missing', done => {
      chai.request(app)
        .patch('/api/sponsors/1')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('DELETE /api/sponsors/:id', () => {
    it('should delete a sponsor with "id" that exists', async () => {
      const sponsors = await db('sponsors');
      return chai.request(app)
        .del(`/api/sponsors/${sponsors[0].id}`)
        .then((res) => {
          expect(res).to.have.status(200);
          return chai.request(app)
            .get('/api/sponsors/')
            .then((res2) => {
              expect(res2).to.have.status(200);
              if (res2.error.text) {
                console.error(res2.error.text);
              }
              res2.body.forEach((member) => {
                expect(member).to.satisfy((item) => item.id !== sponsors[0].id);
              });
            });
        });
    });

    it('should return 404 when an id is not provided', done => {
      chai.request(app)
        .del('/api/sponsors/')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should continue if the id does not exist', done => {
      chai.request(app)
        .del('/api/sponsors/987654321')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  /**SPONSOR DESCRIPTION API ENDPOINT */
  describe('GET /api/sponsors/description', () => {
    it('should return page description entries when called', done => {
      chai
        .request(app)
        .get('/api/sponsors/description')
        .end((err, res) => {
          expect(res).to.have.status(200);
          if (res.error.text) {
            console.error(res.error.text);
          }
          const sponsorDescription = res.body;
          expect(sponsorDescription).to.have.keys([
            'title',
            'description',
            'images',
            'createdAt',
            'updatedAt'
          ]);
          done();
        });
    });
  });

  describe('PATCH /api/sponsors/description', () => {
    it('should update page description entries when called', done => {
      chai
        .request(app)
        .patch('/api/sponsors/description')
        .send({
          title: 'This is a title updated',
          description: 'This is a description updated',
          images: ['image1.png', 'image2.png', 'image3.png']
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          if (res.error.text) {
            console.error(res.error.text);
          }

          chai.request(app)
            .get('/api/sponsors/description')
            .end((err2, res2) => {
              expect(res2).to.have.status(200);
              if (res2.error.text) {
                console.error(res2.error.text);
              }

              expect(res2.body).to.deep.include({
                title: 'This is a title updated',
                description: 'This is a description updated',
                images: ['image1.png', 'image2.png', 'image3.png']
              });
              done();
            });
        });
    });

    it('should return 400 when body is missing', done => {
      chai.request(app)
        .patch('/api/sponsors/description')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should return 400 when body is incomplete', done => {
      chai.request(app)
        .patch('/api/sponsors/description')
        .send({
          title: 'This is a title updated',
          images: ['image1.png', 'image2.png', 'image3.png']
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
