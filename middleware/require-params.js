
module.exports = function(params) {
  return function* (next) {
    if (!this.request.body) {
      this.throw(400, 'data required.')
    }

    for (var i=0, ll=params.length; i<ll; i++) {
      var param = params[i];
      if (!this.request.body[param]) {
        this.throw(400, "missing '"+param+"'");
      }
    }
    yield* next;
  }
}
