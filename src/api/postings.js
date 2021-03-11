const getPostings = (server) => () => server.get('/api/postings');
const getPostingById = (server) => (id) => server.get(`/api/postings/${id}`);

const addRequirementToPosting = (server) => (postingId, requirement) => server.post(`/api/postings/${postingId}/requirement`, {
  requirement,
});

const removePostingRequirement = (server) => (postingId, requirementId) => server.delete(`/api/postings/${postingId}/requirement/${requirementId}`);

const patchPosting = (server) => (postingData, postingId) => server.patch(`/api/postings/${postingId}`, postingData);

const createNewPosting = (server) => () => server.post('/api/postings', {
  title: 'New Title',
  teamId: 1,
  deadline: new Date(),
  location: 'On Site',
  termYear: '2020',
  termSeason: 'WINTER',
  closed: true,
  description: 'Enter Description',
  timeCommitment: '8-10 Hours a Week',
});

const deletePosting = (server) => (postingId) => server.delete(`/api/postings/${postingId}`);

export default (server) => ({
  getPostingById: getPostingById(server),
  getPostings: getPostings(server),
  patchPosting: patchPosting(server),
  addRequirementToPosting: addRequirementToPosting(server),
  removePostingRequirement: removePostingRequirement(server),
  createNewPosting: createNewPosting(server),
  deletePosting: deletePosting(server),
});
