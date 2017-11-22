module.exports = function(params) {
  return function* (next) {
    if (process.env.NODE_ENV === 'production') {
      this.throw(401, "No admin access on production");
    }

    yield* next;
  }
}
