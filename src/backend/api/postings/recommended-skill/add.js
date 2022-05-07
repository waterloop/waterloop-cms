import db from '../../../db';

const add = (req, res) => {
  const { postingId } = req;
  const { recommendedSkill } = req.body;
  db
    .postings
    .addRecommendedSkillToPosting(postingId, recommendedSkill)
    .then(() => db
      .postings
      .getRecommendedSkillsByPostingId(postingId)
      .catch(() => res.sendStatus(500))
    )
    .then((info) => res.send(info))
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
}

export default add;
