process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Blog Routes', () => {
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

  describe('GET /api/blogs', () => {
    it('should return an object with the status of the request (Y or N) and array of all postings', (done) => {
      chai
        .request(app)
        .get('/api/blogs/')
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys(['success', 'posts']);
          res.body.posts.forEach((item) => {
            expect(item).to.have.keys([
              'id',
              'author',
              'title',
              'summary',
              'date',
              'content',
              'link',
              'image',
              'closed',
              'visibility', 
              'category'
            ]);
          });
          done();
        });
    });
  });

  describe('GET /api/blogs/latest/', () => {
    it('should return object of status of request as well as an array of the 3 most recent postings', (done) => {
      chai
        .request(app)
        .get('/api/blogs/latest')
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys(['success', 'posts']);
          expect(res.body.posts.length).to.equal(3);
          res.body.posts.forEach((item) => {
            expect(item).to.have.keys([
              'id',
              'author',
              'title',
              'summary',
              'date',
              'content',
              'link',
              'image',
              'closed',
              'visibility', 
              'category'
            ]);
          });
          done();
        });
    });
  });

  describe('POST /api/blogs/', () => {
    it('should add post to the database if data is in proper format', (done) => {
      chai
        .request(app)
        .post('/api/blogs')
        .send({
          author: 'Evan',
          title: 'test',
          summary: "Testing the '/api/blogs/add' route",
          date: '22-Aug-2021',
          link: 'https://test.com',
          image: 'https://picsum.photos/200/300',
          closed: true,
          visibility: 'Public', 
          category: 'Blog'
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
              'author',
              'title',
              'summary',
              'date',
              'content',
              'link',
              'image',
              'closed',
              'visibility', 
              'category'
            ]);
          });
          done();
        });
    });
    it('should send status 400 if improper body is sent (validation error)', (done) => {
      chai
        .request(app)
        .post('/api/blogs')
        .send({
          title: 'test',
          summary: "Testing the '/api/blogs/add' route",
          date: '22-Aug-2021',
          link: 'https://test.com',
          image: 'https://picsum.photos/200/300',
        })
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should send status 400 if summary exceeds 200 characters (validation error)', (done) => {
      chai
      .request(app)
      .post('/api/blogs')
      .send({
        author: 'Evan',
        title: 'test',
        summary: "Testing the '/api/blogs/add' route lorem ipsum ssomething something I want to exceed the 200 character limit how the heck are you btw my days been great hbu as;ldkfjas;ldfjas;ldkfjas;dlkfjasd;lkfjasl;dfjlas;kdjflkasdasd",
        date: '22-Aug-2021',
        link: 'https://test.com',
        image: 'https://picsum.photos/200/300',
        closed: true,
        visibility: 'Public', 
        category: 'Blog'
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        expect(res).to.have.status(400);
        done();
      });
    })
    it('should send status 400 if summary is 0 characters (validation error)', (done) => {
      chai
      .request(app)
      .post('/api/blogs')
      .send({
        author: 'Evan',
        title: 'test',
        summary: "",
        date: '22-Aug-2021',
        link: 'https://test.com',
        image: 'https://picsum.photos/200/300',
        closed: true,
        visibility: 'Public', 
        category: 'Blog'
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        expect(res).to.have.status(400);
        done();
      });
    })
  });

  describe('PATCH /api/blogs/:id', () => {
    it('should edit the blog in the database if "id" exists', async () => {
      const blogList = await db('blogs');
      return chai
        .request(app)
        .patch(`/api/blogs/${blogList[0].id}`)
        .send({
          author: 'Parth',
          title: 'test',
          summary: "Testing the '/api/blogs/edit/:id' route",
          date: '06-Oct-2021',
          link: 'https://test.com',
          image: 'https://picsum.photos/200/300',
          closed: true,
          visibility: 'Public', 
          category: 'Blog'
        })
        .then((res) => {
          expect(res).to.have.status(200);
        });
    });
    it('should return 404 if the blog is not found', (done) => {
      chai
        .request(app)
        .patch(`/api/blogs/-1`)
        .send({
          author: 'Parth',
          title: 'test',
          summary: "Testing the '/api/blogs/edit/:id' route",
          date: '06-Oct-2021',
          link: 'https://test.com',
          image: 'https://picsum.photos/200/300',
          closed: true,
          visibility: 'Public', 
          category: 'Blog'
        })
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          expect(res).to.have.status(404);
        });
      done();
    });
  });

  describe('DELETE /api/blogs/:id', () => {
    it('should delete a blog from the database if "id" exists', async () => {
      const blogList = await db('blogs');
      return chai
        .request(app)
        .delete(`/api/blogs/${blogList[0].id}`)
        .then((res) => {
          expect(res).to.have.status(200);
        });
    });
    it('should return a 404 if "id" does not exist', (done) => {
      chai
        .request(app)
        .delete(`/api/blogs/-1`)
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
