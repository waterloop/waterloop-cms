import db from '../../../db';

const add = (req, res) => {
  const { postingId } = req;
  const { requirement } = req.body;
  console.log(postingId)
  console.log(requirement)
  db
    .postings
    .addRequirementToPosting(postingId, requirement)
    .then(() => db
      .postings
      .getRequirementsByPostingId(postingId)
      .catch(() => res.sendStatus(500))
    )
    .then((info) => res.send(info))
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
}

export default add;
