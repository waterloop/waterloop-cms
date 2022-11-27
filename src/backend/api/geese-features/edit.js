import db from '../../db';

export default (req, res) => {
  const id = req.params.id;
  const updatedFeatureInfo = req.body;

  db.geeseFeatures
    .editFeature(id, updatedFeatureInfo)
    .then((response) => {
      if (response) {
        res.status(200).send('Edit successful');
      } else {
        res.status(404).send('Could not find feature to edit');
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
