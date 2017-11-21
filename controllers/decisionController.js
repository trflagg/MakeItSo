
module.exports = function(app, db) {

  app.get('/decisions'
          , getDecisions);
  function *getDecisions() {
    var decisions = yield db.loadMultiple('Decision', {});

    this.body = {decisions: decisions};
  }

};
