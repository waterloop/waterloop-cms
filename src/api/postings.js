const getPostings = (server) => () => server.get('/api/postings');

const getPostingById = (server) => (id) => server.get(`/api/postings/${id}`);

export default (server) => ({
  getPostingById: getPostingById(server),
  getPostings: getPostings(server),
});
