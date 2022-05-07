import db from '../../db';
import * as R from 'ramda';
import { parseTimeFromRequest } from '../../utils/db-dates';

const update = (req, res, next) => {
  const { params, body } = req;
  if (!body || body === {} || R.isNil(body)) {
    res.sendStatus(400);
    return;
  }
  const { id } = params;
  const posting = R.pickBy((value) => !R.isNil(value), {
    title: R.propOr(undefined, 'title', body),
    teamId: R.propOr(undefined, 'teamId', body),
    deadline: R.propOr(undefined, 'deadline', body),
    location: R.propOr(undefined, 'location', body),
    termYear: R.propOr(undefined, 'termYear', body),
    termSeason: R.propOr(undefined, 'termSeason', body),
    description: R.propOr(undefined, 'description', body),
    closed: R.propOr(undefined, 'closed', body),
    requirements: R.propOr(undefined, 'requirements', body),
    recommendedSkills: R.propOr(undefined, 'recommendedSkills', body),
    skillsToBeLearned: R.propOr(undefined, 'skillsToBeLearned', body),
    info: R.propOr(undefined, 'info', body),
    tasks: R.propOr(undefined, 'tasks', body),
    timeCommitment: R.propOr(undefined, 'timeCommitment', body)
  });
  if (posting.deadline) {
    posting.deadline = parseTimeFromRequest(posting.deadline);
  }

  if (R.keys(posting).length === 0) {
    res.sendStatus(400);
    next();
    return;
  }

  db.postings.updatePosting(id, posting)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
      next();
    });
};

export default update;
