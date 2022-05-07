import db from '../../db';

export default (req, res) => {
  const {joinTierName} = req.query;

  if(joinTierName){

    db.sponsors.getSponsorsWithTierName()
    .then((sponsors) => {
      res.send(sponsors);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });

  } else {

    db.sponsors.getSponsors()
    .then((sponsors) => {
      res.send(sponsors);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });

  }
  
  
}
