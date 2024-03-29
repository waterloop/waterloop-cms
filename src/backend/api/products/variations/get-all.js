import db from '../../../db';

export default (req, res) => {
  const { productId } = req
  db.products.getProductVariations(productId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(`Error in getProductVariations: ${err}`);
      res.sendStatus(500);
    });
};

