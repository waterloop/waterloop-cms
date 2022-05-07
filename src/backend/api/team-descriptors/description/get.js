import db from '../../../db';

export default (req, res) => {
  db.teamDescriptors
    .getTeamDesc()
    .then((response) => {
      res.send(response).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
