import db from '../../../db';

const del = (req, res) => {
  const { recommendedSkillId } = req.params;

  db.postings.deleteRecommendedSkillByRecId(recommendedSkillId)
    .then(() => {
      res.status(200).send([recommendedSkillId]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
}

export default del;
