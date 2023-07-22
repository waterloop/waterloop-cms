import db from '../../../db';

export default (req, res) => {
  let productVariationData = req.body;
  const productId = req.productId

  productVariationData = {...productVariationData, productId }

  db.products.addProductVariation(productVariationData)
    .then((response) => {
      if (response) {
        res.send(response);
      }
    })
    .catch((err) => {
      console.log(`Could not add product: ${err}`);
      res.sendStatus(500);
    });
}
