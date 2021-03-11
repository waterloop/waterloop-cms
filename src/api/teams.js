const getTeams = (server) => () => server.get('/api/team-descriptors');

export default (server) => ({
  getTeams: getTeams(server),
});
