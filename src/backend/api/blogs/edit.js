import db from '../../db';

export default (req, res) => {
    const id = req.params.id;
    const updatedBlogInfo = req.body;

    db.blogs.editBlog(id, updatedBlogInfo)
    .then((response) => {
      if (response.length === 1) {
          console.log("Edit successful")
          res.status(200).send('Edit successful');
          return;
      } else {
          console.log("Edit unsuccessful");
          res.status(404).send('Could not find blog post to edit')
          return;
      }
  })
    .catch((err) => {
      console.log(err);
      console.log("Server error");
      res.sendStatus(500);
    });
  }