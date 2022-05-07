import * as R from 'ramda';
import db from '../../db';

const getAll = (req, res) => {
  const { query } = req;

  if (R.isNil(query.active) || !query.active) {
    if (R.isNil(query.joinTeamName) || !query.joinTeamName) {
      db.postings.getPostings()
        .then((postings) => {
          res.send(postings);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    } else {
      db.postings.getPostingsWithTeamNames()
        .then((postings) => {
          res.send(postings);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    }
  } else {
    if (R.isNil(query.joinTeamName) || !query.joinTeamName) {
      db.postings.getActivePostings()
        .then((postings) => {
          res.send(postings)
        });
    } else {
      db.postings.getActivePostingsWithTeamNames()
        .then((postings) => {
          res.send(postings)
        });
    }
  }
};

export default getAll;
