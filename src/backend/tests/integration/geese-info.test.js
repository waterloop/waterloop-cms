process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Geese Info Routes', () => {
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

  describe('GET /api/geese-info/', () => {
    it('should return a list of geese info when called', done => {
      chai
        .request(app)
        .get('/api/geese-info/')
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
            done(res.error.text);
          }
          expect(res).to.have.status(200);
          res.body.forEach((item) => {
            expect(item).to.have.keys(['id', 'name', 'description', 'updatedAt'])
          });
          done();
        })
    });
  });

  describe('GET /api/geese-info/:id', () => {
    it('should return a goose pod with specific ID when called', async () => {
      const geese = await db('geese_info');
      return chai
        .request(app)
        .get(`/api/geese-info/${geese[0].id}`)
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys(['id', 'name', 'description', 'updatedAt']);
        });
    });
    it('should return 404 for a non-existent pod when called', done => {
      chai
        .request(app)
        .get('/api/geese-info/9001')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        })
    });
  });

  describe('GET /api/geese-info/images/:id', () => {
    it('should return a list of images for a goose pod when called', async () => {
      const geese = await db('geese_info');
      return chai
        .request(app)
        .get(`/api/geese-info/images/${geese[0].id}`)
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          res.body.forEach(element => {
            expect(element).to.have.keys(['id', 'gooseId', 'imgDir'])
          });
        })
    });
    it('should return 404 for a non-existent pod or a pod with no images when called', done => {
      chai
        .request(app)
        .get('/api/geese-info/images/9001')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        })
    });
  });

  describe('POST /api/geese-info/', () => {
    it('should add a goose pod to the db with a well formed input', done => {
      chai.request(app)
        .post('/api/geese-info/')
        .send({
          name: 'Goose X',
          description: "The up and coming Goose X available Feb 30, 2999",
          updatedAt: 1609518840000,
        })
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.have.length(1)
          chai.request(app)
            .get(`/api/geese-info/${res.body[0]}`)
            .end((err, res) => {
              if (res.error.text) {
                console.error(res.error.text);
              }
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('id')
              expect(res.body).to.have.property('description', 'The up and coming Goose X available Feb 30, 2999')
              expect(res.body).to.have.property('name', 'Goose X')
              expect(res.body).to.have.property('updatedAt')
              done();
            })
        });
    });

    it('should return 400 with no input supplied', done => {
      chai.request(app)
        .post('/api/geese-info/')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return 400 with some required inputs not provided', done => {
      chai.request(app)
        .post('/api/geese-info/')
        .send({
          name: 'Tesla Inc.'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('POST /api/geese-info/images', () => {
    it('should add geese pod images to the db with a well formed input', async () => {
      const geese = await db('geese_info');
      const geeseImages = await db('geese_images');
      return chai.request(app)
        .post('/api/geese-info/images')
        .send([
          {
            gooseId: geese[0].id,
            imgDir: "fungoose.jpg"
          },
          {
            gooseId: geese[0].id,
            imgDir: "funnygeese.gif"
          },
          {
            gooseId: geese[0].id,
            imgDir: "0.jpg"
          }
        ])
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          return chai.request(app)
            .get(`/api/geese-info/images/${geese[0].id}`)
            .then((res) => {
              if (res.error.text) {
                console.error(res.error.text);
              }
              expect(res).to.have.status(200);
              const imageDirs = [];
              res.body.forEach(obj => {
                expect(obj).to.have.keys(['id', 'gooseId', 'imgDir']);
                imageDirs.push(obj.imgDir);
              })
              expect(imageDirs).to.include.members(['fungoose.jpg', 'funnygeese.gif', '0.jpg']);
              // expect(res.body).to.deep.include.members([
              //   {
              //     id: geeseImages[geeseImages.length-1].id + 1,
              //     gooseId: geese[0].id,
              //     imgDir: "fungoose.jpg"
              //   },
              //   {
              //     id: geeseImages[geeseImages.length-1].id + 2,
              //     gooseId: geese[0].id,
              //     imgDir: "funnygeese.gif"
              //   },
              //   {
              //     id: geeseImages[geeseImages.length-1].id + 3,
              //     gooseId: geese[0].id,
              //     imgDir: "0.jpg"
              //   }
              // ]);
            });
        });
    });

    it('should return 400 with no input supplied', done => {
      chai.request(app)
        .post('/api/geese-info/images')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return 400 with malformed inputs provided', done => {
      chai.request(app)
        .post('/api/geese-info/images')
        .send({
          gooseId: 1,
          imgDir: "0.jpg",
          somethingExtra: "sd"
        },
        {
          gooseId: 5,
          imgDir: "0.jpg"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('PATCH /api/geese-info/:id', () => {
    it('should update the entry with "id" to match the new body', async () => {
      const geese = await db('geese_info');
      return chai.request(app)
        .patch(`/api/geese-info/${geese[0].id}`)
        .send({
          name: 'Goose MMXXI',
          updatedAt: 2147483647000
        })
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          return chai.request(app)
            .get(`/api/geese-info/${geese[0].id}`)
            .then((res2) => {
              if (res2.error.text) {
                console.error(res.error.text);
              }
              expect(res2).to.have.status(200);
              expect(res2.body).to.have.property('id', geese[0].id);
              expect(res2.body).to.have.property('name', 'Goose MMXXI');
              expect(res2.body).to.have.property('description');
              expect(res2.body).to.have.property('updatedAt');
            });
        })
    })

    it('should return 400 if an id is not provided', done => {
      chai.request(app)
        .patch('/api/geese-info/')
        .send({
          name: 'Goose MMXXI',
          description: "henlo",
          updatedAt: 2147483647000
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should return 400 when body is missing', done => {
      chai.request(app)
        .patch('/api/geese-info/1')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('DELETE /api/geese-info/:id', () => {
    it('should delete a goose info entry with "id" that exists', async () => {
      const geese = await db('geese_info');
      chai.request(app)
        .del(`/api/geese-info/${geese[0].id}`)
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          chai.request(app)
            .get(`/api/geese-info/${geese[0].id}`)
            .then((res2) => {
              if (res2.error.text) {
                console.error(res2.error.text);
              }
              expect(res).to.have.status(404);
            });
        });
    });

    it('should return 400 when an id is not provided', done => {
      chai.request(app)
        .del('/api/geese-info/')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should return 404 if the id does not exist', done => {
      chai.request(app)
        .del('/api/geese-info/987654321')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('DELETE /api/geese-info/images/:id', () => {
    it('should delete a goose image entry with "id" that exists', async () => {
      const geeseImages = await db('geese_images');
      chai.request(app)
        .del(`/api/geese-info/images/${geeseImages[0].id}`)
        .then((res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          expect(res).to.have.status(200);
          return chai.request(app)
            .get(`/api/geese-info/images/${geeseImages[0].goose_id}`)
            .then((res2) => {
              if (res2.error.text) {
                console.error(res2.error.text);
              }
              expect(res2).to.have.status(200);
              res2.body.forEach(obj => {
                expect(obj).to.not.have.property('id', geeseImages[0].id);
              });
            });
        });
    });

    it('should return 400 when an id is not provided', done => {
      chai.request(app)
        .del('/api/geese-info/images/')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should return 404 if the id does not exist', done => {
      chai.request(app)
        .del('/api/geese-info/images/987654321')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
