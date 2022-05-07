import db from '../../../db';

const del = (req, res) => {
  const { infoId } = req.params;

  db.postings.deleteInfoByInfoId(infoId)
    .then(() => {
      res.status(200).send([infoId]);
    })
    .catch(() => {
      res.sendStatus(500);
    })
}

export default del;
