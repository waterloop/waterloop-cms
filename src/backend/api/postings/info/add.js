import db from '../../../db';

const add = (req, res) => {
  const { postingId } = req;
  const { info } = req.body;
  db
    .postings
    .addInfoToPosting(postingId, info)
    .then(() => db
      .postings
      .getInfoByPostingId(postingId)
      .catch(() => res.sendStatus(500))
    )
    .then((info) => res.send(info))
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
}

export default add;
