import db from '../../../db';
import * as R from 'ramda';

export default (req, res) => {
  const data = req.body;

  // Checks if there's an empty body in the request: Workaround for express-validator.js not being able to check for this.
  if (R.isEmpty(data)) {
    res.sendStatus(400);
    return;
  }

  db.teamDescriptors
    .updateTeamDesc(data)
    .then((response) => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Could not update team description: ${err}`);
      res.sendStatus(500);
    });
};
