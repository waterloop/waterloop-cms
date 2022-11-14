import db from '../../db';
import * as R from 'ramda';

export default (req, res) => {
  db.geeseFeatures
    .getFeatureById(req.params.id)
    .then((feature) => {
      if (R.isEmpty(feature)) {
        res.sendStatus(404);
      } else {
        res.send(feature);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
