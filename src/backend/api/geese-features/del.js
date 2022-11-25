import db from '../../db';

export default (req, res) => {
  db.geeseFeatures
    .deleteFeature(req.params.id)
    .then((response) => {
      if (response) {
        res.status(200).send('Deletion successful');
      } else {
        res.status(404).send('Could not find feature to delete');
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
