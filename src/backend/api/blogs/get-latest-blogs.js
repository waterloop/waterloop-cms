import db from '../../db';

export default (req, res) => {
  db.blogs.getLatestBlogs()
  .then((blogs) => {
    res.send(blogs);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
}
