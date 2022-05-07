import db from '../../db';

export default (req, res) => {
    const id = req.params.id;
    const updatedBlogInfo = req.body;

    db.blogs.editBlog(id, updatedBlogInfo)
    .then((response) => {
      if (response.length === 1) {
          res.status(200).send('Edit successful')
      } else {
          res.status(404).send('Could not find blog post to edit')
      }
  })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  }