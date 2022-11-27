import db from '../../db';

export default (req, res) => {
  db.geeseFeatures
    .getFeatures()
    .then((features) => {
      res.send(features);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
