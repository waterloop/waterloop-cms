import db from '../../db';

export default (req, res) => {
  const { variationId } = req.params;
  db.getProductVariationsById(variationId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(`Error in getProductVariationsById: ${err}`);
      res.sendStatus(500);
    });
};
