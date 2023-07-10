import db from '../../db';

export default (req, res) => {
  db.products.getProducts()
    .then((products) => {
      console.log(products)
      res.send(products);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
