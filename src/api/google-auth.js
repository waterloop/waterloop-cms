const authenticate = (server) => (socket) => server.get(`/google?socketId=${socket.id}`);
const getPicture = (server) => (userId) => server.get(`/google/picture/${userId}`);

const checkToken = (server) => (idToken) => server.get(`/google?token=${idToken}`);

export default (server) => ({
  authenticate: authenticate(server),
  getPicture: getPicture(server),
  checkToken: checkToken(server),
});
