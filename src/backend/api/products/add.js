import db from '../../db';

export default (req, res) => {
  const productData = req.body;
  db.products.addProduct(productData)
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
