import db from '../../../db';

const add = (req, res) => {
  const { postingId } = req;
  const { skillToBeLearned } = req.body;
  console.log(postingId)
  console.log(skillToBeLearned)
  db
    .postings
    .addSkillToBeLearnedToPosting(postingId, skillToBeLearned)
    .then(() => db
      .postings
      .getSkillsToBeLearnedByPostingId(postingId)
      .catch(() => res.sendStatus(500))
    )
    .then((info) => res.send(info))
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
}

export default add;
