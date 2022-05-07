// This custom middleware allows us to attach the socket id to the session.
// With the socket id attached we can send back the right user info to
// the right socket
const addSocketIdToSession = (req, res, next) => {
  console.log('Settings SocketId:', req.query.socketId)
  req.session.socketId = req.query.socketId;
  console.log('Req.session', req.session)
  next();
};

export default addSocketIdToSession;
