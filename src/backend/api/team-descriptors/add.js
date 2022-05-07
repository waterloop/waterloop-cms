import db from '../../db';

export default (req, res) => {

  const teamDescriptor = req.body;

  db.teamDescriptors.addTeamDescriptor(teamDescriptor)
    .then((response) => {
      if (response) {
        res.send(response);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  return;
};
