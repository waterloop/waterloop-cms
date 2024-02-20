const getGeeseFeatures = (server) => () => server.get('/api/geese-features');
const getGeeseFeatureById = (server) => (id) =>
  server.get(`/api/geese-features/${id}`);
const addGeeseFeature = (server) => (featureInfo) =>
  server.post(`/api/geese-features`, featureInfo);
const updateGeeseFeature = (server) => (id, updatedFeatureInfo) =>
  server.patch(`/api/geese-features/${id}`, updatedFeatureInfo);
const deleteGeeseFeature = (server) => (id) =>
  server.delete(`/api/geese-features/${id}`);

export default (server) => ({
  getGeeseFeatures: getGeeseFeatures(server),
  getGeeseFeatureById: getGeeseFeatureById(server),
  addGeeseFeature: addGeeseFeature(server),
  updateGeeseFeature: updateGeeseFeature(server),
  deleteGeeseFeature: deleteGeeseFeature(server),
});
