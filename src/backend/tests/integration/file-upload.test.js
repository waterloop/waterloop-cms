process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import app from '../../index';
import fs from 'fs';


chai.use(chaiHttp);
const expect = chai.expect;

describe("File Upload Routes", () => {
  describe("POST /api/upload", () => {
    it('should return a url to the image uploaded', async () => {
      chai
        .request(app)
        .post('/api/upload', )
        .set('Content-Type', 'multipart/form-data')
        .attach('files', fs.readFileSync(`${global.rootDirectory}/tests/files/test.png`), 'test.png')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys(['message', 'data']);
          expect(res.body.data).to.have.lengthOf(1);
          expect(res.body.data[0]).to.deep.equal(`/waterloop/tmp/test.png`);
          return;
        });
    });
  })
})
