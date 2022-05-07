import db from '../../db';

export default (req, res) => {
  const blogData = req.body;
  db.blogs.addBlog(blogData)
    .then((response) => {
      if (response) {
        res.send(response);
      }
    })
    .catch((err) => {
      console.log(`Could not add blog: ${err}`);
      res.sendStatus(500);
    });
}