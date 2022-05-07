import db from '../../../db';

const add = (req, res) => {
  const { postingId } = req;
  const { task } = req.body;
  db
    .postings
    .addTaskToPosting(postingId, task)
    .then(() => db
      .postings
      .getTasksByPostingId(postingId)
      .catch(() => res.sendStatus(500))
    )
    .then((info) => res.send(info))
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
}

export default add;
