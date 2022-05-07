import db from '../../db';

const del = (req, res, next) => {
  const { id } = req.params;
  db.postings.deletePosting(id)
    .then((result) => {
      if (result == 1) {
        console.log(`Deleted Posting with id: ${id}`);
        res.sendStatus(200);
      } else if (result == 0) {
        console.log(`Posting with id: ${id} not found`);
        res.sendStatus(404);
      }

    })
    .catch((err) => {
      console.log(`Error deleting posting with ID: ${id}`);
      console.log(err);
      next();
    });
};

export default del;
