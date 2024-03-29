import db from '../../db';

export default (req, res) => {
  db.products.deleteProductById(req.params.id)
    .then((response) => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Could not delete product: ${err}`);
      res.sendStatus(500);
    });
}
