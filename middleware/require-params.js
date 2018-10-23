
module.exports = function(params) {
  return function (req, res, next) {
    if (!req.body) {
      res.status(400).send('body data required.');
    }

    for (var i=0, ll=params.length; i<ll; i++) {
      var param = params[i];
      if (!req.body[param]) {
        res.status(400).send("missing '"+param+"'");
      }
    }
    next();
  }
}
