import db from '../../db';

export default (req, res) => {
  db.geeseInfo.deleteGooseInfoById(req.params.id)
    .then((response) => {
      if (response) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}
