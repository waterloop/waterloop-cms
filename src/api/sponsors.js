const getSponsorTiers = (server) => () => server.get(`/api/sponsors/tiers`);

const getSponsorDesc = (server) => () => server.get(`/api/sponsors/description`);
const updateSponsorDesc = (server) => (data) => server.patch(`/api/sponsors/description`, data);

const getSponsors = (server) => () => server.get(`/api/sponsors/`);

const addSponsor = (server) => (data) => server.post(`/api/sponsors/`, data);
const updateSponsor = (server) => (data, id) => server.patch(`/api/sponsors/${id}`, data);

const deleteSponsor = (server) => (id) => server.delete(`/api/sponsors/${id}`);

export default (server) => ({
  getSponsorTiers: getSponsorTiers(server),
  getSponsorDesc: getSponsorDesc(server),
  updateSponsorDesc: updateSponsorDesc(server),
  getSponsors: getSponsors(server),
  addSponsor: addSponsor(server),
  updateSponsor: updateSponsor(server),
  deleteSponsor: deleteSponsor(server),
});
