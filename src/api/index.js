import google from './google-auth';
import postings from './postings';
import server from './server';
import teams from './teams';
import formUpload from './formUpload';
import sponsors from './sponsors';

export default {
  google: google(server),
  postings: postings(server),
  sponsors: sponsors(server),
  teams: teams(server),
  formUpload: formUpload(server),
};
