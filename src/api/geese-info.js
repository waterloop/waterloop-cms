const getGeeseInfo = (server) => () => server.get("/api/geese-info");
const getGeeseImages = (server) => (id) =>
  server.get(`/api/geese-info/images/${id}`);
const updateGeeseInfo = (server) => (id, updatedGeeseInfo) =>
  server.patch(`/api/geese-info/${id}`, updatedGeeseInfo);
const addGeeseInfo = (server) => (geeseInfo) =>
  server.post(`/api/geese-info/`, geeseInfo);
const addGeeseImages = (server) => (geeseImages) =>
  server.post(`/api/geese-info/images`, geeseImages);
const deleteGeeseImages = (server) => (id) =>
  server.delete(`/api/geese-info/images/${id}`);

export default (server) => ({
  getGeeseInfo: getGeeseInfo(server),
  getGeeseImages: getGeeseImages(server),
  updateGeeseInfo: updateGeeseInfo(server),
  addGeeseInfo: addGeeseInfo(server),
  addGeeseImages: addGeeseImages(server),
  deleteGeeseImages: deleteGeeseImages(server),
});
