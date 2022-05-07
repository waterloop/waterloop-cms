import db from '../../db';
import * as R from 'ramda';
import { parseTimeFromRequest } from '../../utils/db-dates';

export default (req, res) => {
  const id = req.params.id;

  if (R.isEmpty(req.body)) {
    res.sendStatus(400);
    return;
  }

  const data = req.body.updatedAt ? {
    ...req.body,
    updatedAt: parseTimeFromRequest(req.body.updatedAt)
  } : req.body;

  db.geeseInfo.updateGooseInfoById(id, data)
    .then((response) => {
      if (response) {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.log(`Could not update goose info: ${err}`);
      res.sendStatus(500);
    });
}
