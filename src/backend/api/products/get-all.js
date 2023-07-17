import db from '../../db';

export default (req, res) => {
  db.products.getProducts()
    .then((products) => {
      console.log(products)
      res.send(products);
    })
    .catch((err) => {
      console.log(`Could not fetch all products: ${err}`);
      res.sendStatus(500);
    });
};
