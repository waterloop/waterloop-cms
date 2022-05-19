const connection = require('../knexfile')[process.env.NODE_ENV || 'test'];
export const db = require('knex')(connection);
import users from './users';
import teamDescriptors from './team-descriptors';
import postings from './postings';
import sponsors from './sponsors';
import geeseInfo from './geese-info';
import openingsDescription from './openings-description';
import featurePermissions from './feature-permissions';
import newsletterRecipients from './newsletter-recipient';
import blogs from './blogs';

export default {
  users: {
    ...users(db),
  },
  teamDescriptors: {
    ...teamDescriptors(db),
  },
  postings: {
    ...postings(db),
  },
  sponsors: {
    ...sponsors(db),
  },
  geeseInfo: {
    ...geeseInfo(db),
  },
  openingsDescription: {
    ...openingsDescription(db),
  },
  newsletterRecipients: {
    ...newsletterRecipients(db),
  },
  featurePermissions: {
    ...featurePermissions(db),
  },
  blogs: {
    ...blogs(db),
  },
};
