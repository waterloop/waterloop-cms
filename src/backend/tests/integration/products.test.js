process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';

chai.use(chaiHttp);
const expect = chai.expect;

// implement products, below should be product variation

describe('Products Routes', () => {
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

  describe('GET /api/products', () => {
    it('should return a list of products when called', (done) => {
      chai
        .request(app)
        .get('/api/products')
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.forEach((item) => {
            expect(item).to.have.keys([
              'id',
              'name',
              'description',
              'category',
            ]);
          });
          done();
        });
    });
  });

  describe('POST /api/products/', () => {
    it('should add post to the database if data is in proper format', (done) => {
      chai
        .request(app)
        .post('/api/products')
        .send({
          name: 'a test product name',
          description: 'a test description',
          category: 'a test category',
        })
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          res.body.forEach((item) => {
            expect(item).to.have.keys([
              'id',
              'name',
              'description',
              'category',
            ]);
          });
          done();
        });
    });

    it('should return 400 with a poorly formed input', (done) => {
      chai
        .request(app)
        .post('/api/products')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });



  describe('PATCH /api/products/:id', () => {
    it('should update the entry with "id" to match the new body', async () => {
      const products = await db('merch_products');
      return chai
        .request(app)
        .patch(`/api/products/${products[0].id}`)
        .send({
          name: 'A updated product name',
          description: 'A updated product description',
          category: 'A updated product category',
        })
        .then((res) => {
          expect(res).to.have.status(200);
          return chai
            .request(app)
            .get('/api/products')
            .then((res2) => {
              expect(res2).to.have.status(200);
              const patchedItem = res2.body.find(
                (item) => item.id === products[0].id,
              );
              expect(patchedItem).to.deep.include({
                name: 'A updated product name',
                description: 'A updated product description',
                category: 'A updated product category',
              });
            });
        });
    });

    it('should return 404 if an id is not provided', (done) => {
      chai
        .request(app)
        .patch('/api/products')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should return 400 when body is missing', (done) => {
      chai
        .request(app)
        .patch('/api/products/1')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  // variations

  describe('GET /api/products/:id/variations', () => {
    it('should return a list of product variations when called', (done) => {
      chai
        .request(app)
        .get('/api/products/1/variations')
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.forEach((item) => {
            expect(item).to.have.keys([
              'id',
              'variationName',
              'productId',
              'price',
              'stock',
              'picture',
              'lastUpdated',
            ]);
          });
          done();
        });
    });
  });

  describe('POST /api/products/:id/variations', () => {
    it('should add a product variation to the db with a well-formed input', async () => {
      try {
        const products = await db('merch_products');
        const response = await chai
          .request(app)
          .post(`/api/products/${products[0].id}/variations`)
          .send({
            productId: products[0].id,
            variationName: 'A new product',
            price: 69,
            stock: 1,
            picture: './test',
            lastUpdated: 1609518840000,
          });
  
        expect(response).to.have.status(200);
  
        const res2 = await chai
          .request(app)
          .get(`/api/products/${products[0].id}/variations`);
  
        expect(res2).to.have.status(200);
  
        expect(res2.body.some((variation) => variation.productId === products[0].id)).to.equal(true);
      } catch (error) {
        throw error;
      }
    });
  });
  

  describe('DELETE /api/products/:id/variations/:productId', () => {
    it('should delete a product variation with "id" that exists', (done) => {
      chai
        .request(app)
        .del('/api/products/1/variations/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          chai
            .request(app)
            .get('/api/products/1/variations')
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
        .del('/api/products/1/variations')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should continue if the id does not exist', (done) => {
      chai
        .request(app)
        .del('/api/products/1/variations/99999')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('PATCH /api/products/:productId/variations/:variationId', () => {
    it('should update the entry with "id" to match the new body', async () => {
      return chai
        .request(app)
        .patch(`/api/products/1/variations/1`)
        .send({
          variationName: 'A new product',
          price: 69,
          stock: 1,
          picture: './test',
          lastUpdated: 1609518840000,
        })
        .then((res) => {
          expect(res).to.have.status(200);
        });
    });

    it('should return 404 if an id is not provided', (done) => {
      chai
        .request(app)
        .patch('/api/products/1/variations')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should return 400 when body is missing', (done) => {
      chai
        .request(app)
        .patch('/api/products/1/variations/1')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
