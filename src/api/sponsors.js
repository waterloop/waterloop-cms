// TODO: Write contract for getting sponsor by ID in backend?.
// const getSponsorById = (server) => (id) => server.get(`/api/sponsors/${id}`);

const getSponsors = (server) => () => server.get(`/api/sponsors/`);
const getSponsorTiers = (server) => () => server.get(`/api/sponsors/tiers`);
const getSponsorDesc = (server) => () => server.get(`/api/sponsors/description`);

const addSponsor = (server) => (data) => server.post(`/api/sponsors/`, data);
const updateSponsor = (server) => (data, id) => server.patch(`/api/sponsors/${id}`, data);

const deleteSponsor = (server) => (id) => server.delete(`/api/sponsors/${id}`);

export default (server) => ({
  getSponsors: getSponsors(server),
  getSponsorTiers: getSponsorTiers(server),
  getSponsorDesc: getSponsorDesc(server),
  // getSponsorById: getSponsorById(server),
  addSponsor: addSponsor(server),
  updateSponsor: updateSponsor(server),
  deleteSponsor: deleteSponsor(server),
});
