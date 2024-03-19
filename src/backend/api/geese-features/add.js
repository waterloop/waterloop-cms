import db from '../../db';

export default (req, res) => {
  const featureData = req.body;
  console.log(req.body)
  db.geeseFeatures
    .addFeature(featureData)
    .then((response) => {
      if (response) {
        res.send(response);
      } else {
        res.sendStatus(403);
      }
    })
    .catch((err) => {
      console.log(`Could not add feature: ${err}`);
      res.sendStatus(500);
    });
};
