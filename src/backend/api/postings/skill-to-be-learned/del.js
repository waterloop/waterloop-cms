import db from '../../../db';

const del = (req, res) => {
  const { skillToBeLearnedId } = req.params;

  db.postings.deleteSkillToBeLearnedBySkillId(skillToBeLearnedId)
    .then(() => {
      res.status(200).send([skillToBeLearnedId]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
}

export default del;
