const getDescriptions = (server) => () =>
  server.get('/api/openings-description');

const updateDescriptions = (server) => (data) =>
  server.patch(`/api/openings-description`, data);

export default (server) => ({
  updateDescriptions: updateDescriptions(server),
  getDescriptions: getDescriptions(server),
});
