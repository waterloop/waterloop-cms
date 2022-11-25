import db from '../../db';

export default (req, res) => {
  const featureData = req.body;
  db.geeseFeatures
    .addFeature(featureData)
    .then((response) => {
      if (response) {
        res.send(response);
      }
    })
    .catch((err) => {
      console.log(`Could not add feature: ${err}`);
      res.sendStatus(403);
    });
};
