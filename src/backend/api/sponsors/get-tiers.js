import db from '../../db';

export default (req, res) => {
  db.sponsors.getSponsorTiers()
  .then((tiers) => {
    res.send(tiers);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
}
