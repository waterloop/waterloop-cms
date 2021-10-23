const getTeams = (server) => () => server.get("/api/team-descriptors");

const addTeam = (server) => (data) =>
  server.post("/api/team-descriptors", data);

const updateTeam = (server) => (data, id) =>
  server.patch(`/api/team-descriptors/${id}`, data);

const deleteTeam = (server) => (id) =>
  server.delete(`/api/team-descriptors/${id}`);

const getTeamDesc = (server) => () =>
  server.get("/api/team-descriptors/description");

const updateTeamDesc = (server) => (data) =>
  server.patch("/api/team-descriptors/description", data);

export default (server) => ({
  getTeams: getTeams(server),
  addTeam: addTeam(server),
  updateTeam: updateTeam(server),
  deleteTeam: deleteTeam(server),
  getTeamDesc: getTeamDesc(server),
  updateTeamDesc: updateTeamDesc(server),
});
