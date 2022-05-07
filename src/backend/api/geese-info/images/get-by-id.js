import * as R from 'ramda';
import db from '../../../db';

export default (req, res) => {
  db.geeseInfo.getGooseImagesById(req.params.id)
  .then((geeseInfo) => {
    if (R.isEmpty(geeseInfo)) {
      res.sendStatus(404);
    } else {
      res.send(geeseInfo);
    }
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
}
