import db from '../../db';

export default (req, res) => {
  const sponsorData = req.body;
  db.sponsors.addSponsor(sponsorData)
    .then((response) => {
      if (response) {
        res.send(response);
      }
    })
    .catch((err) => {
      console.log(`Could not add sponsor: ${err}`);
      res.sendStatus(500);
    });
}