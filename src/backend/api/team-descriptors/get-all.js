import db from '../../db';

export default (req, res) => {
  db.teamDescriptors.getTeamDescriptors()
    .then((descriptors) => {
      console.log(descriptors)
      res.send(descriptors);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
