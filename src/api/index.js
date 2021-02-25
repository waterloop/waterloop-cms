import google from './google-auth';
import postings from './postings';
import server from './server';
import formUpload from './formUpload';

export default {
  google: google(server),
  postings: postings(server),
  formUpload: formUpload(server),
};
