import db from '../../db';

export default (req, res) => {
  db.geeseInfo.getGeeseInfo()
  .then((geeseInfo) => {
    res.send(geeseInfo);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
}
