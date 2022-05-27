const getBlogs = (server) => () => server.get('/api/blogs');
const getLatestBlogs = (server) => () => server.get('/api/blogs/latest');
const deleteBlog = (server) => (id) => 
  server.delete(`/api/blogs/${id}`);
const editBlog = (server) => (id, updatedBlogs) =>
  server.patch(`/api/blogs/${id}`, updatedBlogs);
const addBlog = (server) => (Blogs) =>
  server.post('/api/blogs/', Blogs);

export default (server) => ({
  getBlogs: getBlogs(server),
  getLatestBlogs: getLatestBlogs(server),
  editBlog: editBlog(server),
  deleteBlog: deleteBlog(server),
  addBlog: addBlog(server),
});
