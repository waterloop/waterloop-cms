import db from '../../db';

export default (req, res) => {
  const id = req.params.id;
  const productInfo = req.body;

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
