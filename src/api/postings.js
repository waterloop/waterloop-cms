const getPostings = (server) => () => server.get('/api/postings');
const getPostingById = (server) => (id) => server.get(`/api/postings/${id}`);

const addRequirementToPosting = (server) => (postingId, requirement) => server.post(`/api/postings/${postingId}/requirement`, {
  requirement,
});

const addInfoToPosting = (server) => (postingId, info) => server.post(`/api/postings/${postingId}/info`, {
  info,
});
const addTaskToPosting = (server) => (postingId, task) => server.post(`/api/postings/${postingId}/task`, {
  task,
});

const removePostingRequirement = (server) => (postingId, requirementId) => server.delete(`/api/postings/${postingId}/requirement/${requirementId}`);

const removePostingTask = (server) => (postingId, taskId) => server.delete(`/api/postings/${postingId}/task/${taskId}`);

const removePostingInfo = (server) => (postingId, infoId) => server.delete(`/api/postings/${postingId}/info/${infoId}`);

const patchPosting = (server) => (postingData, postingId) => server.patch(`/api/postings/${postingId}`, postingData);

const createNewPosting = (server) => () => server.post('/api/postings', {
  title: 'New Title',
  teamId: 1,
  deadline: (new Date()).getTime(),
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
  addInfoToPosting: addInfoToPosting(server),
  addTaskToPosting: addTaskToPosting(server),
  removePostingTask: removePostingTask(server),
  removePostingInfo: removePostingInfo(server),
});
