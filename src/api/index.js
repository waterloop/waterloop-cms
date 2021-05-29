import google from './google-auth';
import postings from './postings';
import server from './server';
import teams from './teams';
import formUpload from './formUpload';
import openingsDescription from './openings-description';
import sponsors from './sponsors';
import geeseInfo from './geese-info';

export default {
  google: google(server),
  postings: postings(server),
  sponsors: sponsors(server),
  teams: teams(server),
  formUpload: formUpload(server),
  openingsDescription: openingsDescription(server),
  geeseInfo: geeseInfo(server),
};
