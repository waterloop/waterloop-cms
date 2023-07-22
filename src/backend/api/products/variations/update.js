import { product } from 'ramda';
import db from '../../../db';
import { toProductVariation } from '../../../models/products';

export default (req, res) => {
  const productVariationInfo = req.body;
  const { productId } = req

  db.products.updateProductVariationById(req.params.variationId, productId, productVariationInfo)
    .then((response) => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Could not update product: ${err}`);
      res.sendStatus(500);
    });
};
