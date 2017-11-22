var render = require('../render')
    , checkAdmin = require('../middleware/check-admin');

module.exports = function(app, db) {

  app.get('/admin/decisions'
          , checkAdmin()
          , getDecisions);
  function *getDecisions() {
    // from indexController.start()
    var basePath = '';
    var scriptPath = 'build/js/main.min.js';
    if (process.env.NODE_ENV !== "production") {
      // webpack-dev-server inside docker-compose
      scriptPath = "http://192.168.99.100:8080/main.min.js";
      basePath = "http://192.168.99.199:8080";
    }
    this.body = yield render('index.html',
                             { production: process.env.NODE_ENV === "production",
                               scriptPath: scriptPath
                             });
  };

  app.get('/admin/decisions/all_ships'
          , checkAdmin()
          , allShips);
  function *allShips() {
  }


  app.get('/admin/decisions/all'
          , checkAdmin()
          , allDecisions);
  function *allDecisions() {
    var decisions = yield db.loadMultiple('Decision', {});

    this.body = {decisions: decisions};
  }

};
