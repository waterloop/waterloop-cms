import db from '../../../db';

export default (req, res) => {
  db.sponsors.getSponsorDesc()
  .then((desc) => {
    res.send(desc);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
}
