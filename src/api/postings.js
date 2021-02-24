const getPostings = (server) => () => server.get('/api/postings');
const getPostingById = (server) => (id) => server.get(`/api/postings/${id}`);

const addRequirementToPosting = (server) => (postingId, requirement) => server.post(`/api/postings/${postingId}/requirement`, {
  requirement,
});

const removePostingRequirement = (server) => (postingId, requirementId) => server.delete(`/api/postings/${postingId}/requirement/${requirementId}`);

const patchPosting = (server) => (postingData, postingId) => server.patch(`/api/postings/${postingId}`, postingData);

export default (server) => ({
  getPostingById: getPostingById(server),
  getPostings: getPostings(server),
  patchPosting: patchPosting(server),
  addRequirementToPosting: addRequirementToPosting(server),
  removePostingRequirement: removePostingRequirement(server),
});
