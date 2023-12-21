import db from '../../db';
import * as R from 'ramda';

export default (req, res) => {
  db.products.getProductDetails(req.params.id)
  .then(async (productInfo) => {
    console.log('here in backend', productInfo);
    if (R.isEmpty(productInfo)) {
      res.sendStatus(404);
    } else {
      let products = [];
      if (productInfo.related_product_ids?.length) {
        const ids = productInfo.related_product_ids.split(" ");
        products = await db.products.getRelatedProducts(ids)
      }
      res.send({...productInfo, related_products: products, thumbnails: [productInfo.thumbnail1, productInfo.thumbnail2, productInfo.thumbnail3, productInfo.thumbnail4]});
    }
  })
  .catch((err) => {
    console.log(`Could not get product with given id: ${err}`);
    res.sendStatus(500);
  });
}