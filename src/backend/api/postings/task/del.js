import db from '../../../db';

const del = (req, res) => {
  const { taskId } = req.params;

  db.postings.deleteTaskByTaskId(taskId)
    .then(() => {
      res.status(200).send([taskId]);
    })
    .catch(() => {
      res.sendStatus(500);
    })
}

export default del;
