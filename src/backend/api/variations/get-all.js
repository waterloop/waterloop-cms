import db from '../../db';

export default (req, res) => {
  db.getProductVariations()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(`Error in getProductVariations: ${err}`);
      res.sendStatus(500);
    });
};

