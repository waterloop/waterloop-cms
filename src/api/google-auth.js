const authenticate = (server) => (socket) => server.get(`/google?socketId=${socket.id}`);
const getPicture = (server) => (userId) => server.get(`/google/picture/${userId}`);

export default (server) => ({
  authenticate: authenticate(server),
  getPicture: getPicture(server),
});
