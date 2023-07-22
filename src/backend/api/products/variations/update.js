import { product } from 'ramda';
import db from '../../../db';

export default (req, res) => {
  const productVariationInfo = req.body;

  db.products.updateProductVariationById(req.params.variationId, productVariationInfo)
    .then((response) => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Could not update product: ${err}`);
      res.sendStatus(500);
    });
};
