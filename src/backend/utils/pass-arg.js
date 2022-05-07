const passArg = (param) => (req, res, next) => {
  req[param] = req.params[param];
  next();
}
export default passArg;
