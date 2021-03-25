// TODO: Write contract for getting sponsor by ID in backend.
// const getSponsorById = (server) => (id) => server.get(`/api/sponsors/${id}`);

const getSponsors = (server) => () => server.get(`/api/sponsors/`);
const getSponsorTiers = (server) => () => server.get(`/api/sponsors/tiers`);


export default (server) => ({
  getSponsors: getSponsors(server),
  getSponsorTiers: getSponsorTiers(server),
  // getSponsorById: getSponsorById(server),
  // getPostings: getPostings(server),
  // patchPosting: patchPosting(server),
  // addRequirementToPosting: addRequirementToPosting(server),
  // removePostingRequirement: removePostingRequirement(server),
  // createNewPosting: createNewPosting(server),
  // deletePosting: deletePosting(server),
});
