import db from '../../db';

export default (req, res) => {
    db.blogs.deleteBlog(req.params.id)
    .then((response) => {
        if (response === 1) {
            res.status(200).send('Deletion successful')
        } else {
            res.status(404).send('Could not find blog post to delete')
        }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  }