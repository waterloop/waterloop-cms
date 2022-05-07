import db from '../../../db';

const del = (req, res) => {
  const { requirementId } = req.params;

  db.postings.deleteRequirementByRegId(requirementId)
    .then(() => {
      res.status(200).send([requirementId]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
}

export default del;
