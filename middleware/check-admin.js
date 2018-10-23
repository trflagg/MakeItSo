module.exports = function(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    res.status(401).send("No admin access on production");
  }
  next();
}
