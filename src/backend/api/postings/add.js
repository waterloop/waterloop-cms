import db from '../../db';
import { parseTimeFromRequest } from '../../utils/db-dates';
import * as R from 'rambda';

const add = (req, res, next) => {
  const posting = req.body;
  console.log(posting)
  const newPosting = {
    ...posting,
    deadline: parseTimeFromRequest(posting.deadline)
  }

  db.postings
    .addPosting(newPosting)
    .then((response) => {
      let id
      if (typeof response === 'number')
        id = response
      if (typeof response === 'object')
        id = response.id
      if (R.isNil(id))
        return res.sendStatus(500)
      res.status(200).send([id])
    })
    .catch((err) => {
      console.log(`Add posting Error: ${err}`);
      next();
    });
};

export default add;
