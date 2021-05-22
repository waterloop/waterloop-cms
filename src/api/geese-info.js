const getGeeseInfo = (server) => () => server.get('/api/geese-info');

export default (server) => ({
  getGeeseInfo: getGeeseInfo(server),
});
