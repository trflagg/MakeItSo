var render = require('../render')
    , ObjectID = require('mongodb').ObjectID
    , checkAdmin = require('../middleware/check-admin')
    , _ = require('underscore');

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

  app.get('/admin/decisions/all-ships'
          , checkAdmin()
          , allShips);
  function *allShips() {
    var ships = yield db.loadMultiple('Ship', {}, {shipName: 1, _id: 1});
    this.body = { ships: ships };
  }


  app.get('/admin/decisions/:ship_id/all'
          , checkAdmin()
          , allDecisions);
  function *allDecisions() {
    var ship_id = this.params.ship_id;
    console.log(ship_id);
    var decisions = yield db.loadMultiple('Decision', {'ship.id': new ObjectID(ship_id)});
    console.log(ship_id);
    console.log(decisions);

    decisions = _.sortBy(decisions, 'created');

    this.body = {decisions: decisions};
  }

};
