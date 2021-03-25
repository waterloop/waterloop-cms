import google from './google-auth';
import postings from './postings';
import server from './server';
import teams from './teams';
import formUpload from './formUpload';
import openingsDescription from './openings-description';

export default {
  google: google(server),
  postings: postings(server),
  teams: teams(server),
  formUpload: formUpload(server),
  openingsDescription: openingsDescription(server),
};
