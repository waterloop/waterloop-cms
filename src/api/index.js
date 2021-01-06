import google from './google-auth';
import postings from './postings';
import server from './server';

export default {
  google: google(server),
  postings: postings(server),
};
