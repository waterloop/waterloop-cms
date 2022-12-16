const getPostings = (server) => (joinTeamName = false) => server.get(`/api/postings${joinTeamName ? '?joinTeamName=true' : ''}`); // is joinTeamName a part of the query?
const getPostingById = (server) => (id, joinTeamName = false) => server.get(`/api/postings/${id}${joinTeamName ? '?joinTeamName=true' : ''}`);

const addRequirementToPosting = (server) => (postingId, requirement) => server.post(`/api/postings/${postingId}/requirement`, {
  requirement,
});

const addInfoToPosting = (server) => (postingId, info) => server.post(`/api/postings/${postingId}/info`, {
  info,
});

const addTaskToPosting = (server) => (postingId, task) => server.post(`/api/postings/${postingId}/task`, {
  task,
});

const addRecommendedSkillToPosting = (server) => (postingId, recommendedSkill) => server.post(`/api/postings/${postingId}/recommendedSkill`, {
  recommendedSkill,
});

const addSkillToBeLearnedToPosting = (server) => (postingId, skillToBeLearned) => server.post(`/api/postings/${postingId}/skillToBeLearned`, {
  skillToBeLearned,
});

const removePostingRequirement = (server) => (postingId, requirementId) => server.delete(`/api/postings/${postingId}/requirement/${requirementId}`);

const removePostingTask = (server) => (postingId, taskId) => server.delete(`/api/postings/${postingId}/task/${taskId}`);

const removePostingInfo = (server) => (postingId, infoId) => server.delete(`/api/postings/${postingId}/info/${infoId}`);

const removePostingRecommendedSkill = (server) => (postingId, recommendedSkillId) => server.delete(`/api/postings/${postingId}/recommendedSkill/${recommendedSkillId}`);

const removePostingSkillToBeLearned = (server) => (postingId, skillToBeLearnedId) => server.delete(`/api/postings/${postingId}/skillToBeLearned/${skillToBeLearnedId}`);

const patchPosting = (server) => (postingData, postingId) => server.patch(`/api/postings/${postingId}`, postingData);

const createNewPosting = (server) => (postingData) => server.post('/api/postings', postingData);

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
  removePostingRecommendedSkill: removePostingRecommendedSkill(server),
  removePostingSkillToBeLearned: removePostingSkillToBeLearned(server),
  addRecommendedSkillToPosting: addRecommendedSkillToPosting(server),
  addSkillToBeLearnedToPosting: addSkillToBeLearnedToPosting(server),
});
