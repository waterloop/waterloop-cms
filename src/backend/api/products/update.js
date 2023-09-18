import db from '../../db';
import * as R from 'ramda';

export default (req, res) => {
  const id = req.params.id;
  const productInfo = req.body;

  if (R.isEmpty(productInfo)) {
    res.sendStatus(400);
  }

  db.products.updateProductById(id, productInfo)
    .then((response) => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Could not update product: ${err}`);
      res.sendStatus(500);
    });
};
