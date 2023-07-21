import db from '../../db';

export default (req, res) => {
  const { id } = req.params;
  db.deleteProductVariationById(id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(`Error in deleteProductVariationById: ${err}`);
      res.sendStatus(500);
    });
};
