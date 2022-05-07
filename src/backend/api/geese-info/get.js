import db from '../../db';
import * as R from 'ramda';

export default (req, res) => {
  db.geeseInfo.getGooseInfoById(req.params.id)
  .then((gooseInfo) => {
    if (R.isEmpty(gooseInfo)) {
      res.sendStatus(404);
    } else {
      res.send(gooseInfo);
    }
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
}
