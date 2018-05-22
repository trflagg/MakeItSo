var render = require('../render')
  , ObjectID = require('mongodb').ObjectID
  , checkAdmin = require('../middleware/check-admin')
  , _ = require('underscore');

module.exports = function(app, db) {

  app.get('/admin/decisions'
    , checkAdmin()
    , getDecisions);
  async function getDecisions() {
    // from indexController.start()
    var basePath = '';
    var scriptPath = 'build/js/main.min.js';
    if (process.env.NODE_ENV !== "production") {
      // webpack-dev-server inside docker-compose
      scriptPath = "http://192.168.99.100:8080/main.min.js";
      basePath = "http://192.168.99.199:8080";
    }
    this.body = await render('index.html',
      { production: process.env.NODE_ENV === "production",
        scriptPath: scriptPath
      });
  };

  app.get('/admin/decisions/all-ships'
    , checkAdmin()
    , allShips);
  async function allShips() {
    var ships = await db.loadMultiple('Ship', {}, {shipName: 1, _id: 1});
    this.body = { ships: ships };
  }


  app.get('/admin/decisions/:ship_id/all'
    , checkAdmin()
    , allDecisions);
  async function allDecisions() {
    var ship_id = this.params.ship_id;
    var decisions = await db.loadMultiple('Decision', {'ship._id': new ObjectID(ship_id)});

    decisions = _.sortBy(decisions, 'created').map(function(decision) {
      var result = decision;
      result.globals = decision.ship._globals;
      result.ship = decision.ship.toClient();
      return result;
    });

    this.body = {decisions: decisions};
  }

  app.post('/admin/decision/:decision_id/:command+'
    , checkAdmin()
    , runDecisionCommand);
  async function runDecisionCommand() {
    var decision_id = this.params.decision_id
    var decision = await db.load('Decision', {'_id': new ObjectID(decision_id)});
    if (decision) {
      var ship = decision.ship;
      var commands = this.params.command.split('/');
      var command = commands.pop();
      var child = commands.join('.');
      var message = ship.message(command, child);
      if (!message) {
        throw new Error('no message found');
      }
      await ship.runCommand(command, child);
      await db.save('Ship', ship);
      var decision = db.create('Decision');
      await decision.fromShipCommandAndChild(ship, message, command, child);
      var result = decision
      result.globals = decision.ship._globals;
      result.ship = decision.ship.toClient();
      this.body = result;
    } else {
      throw new Error('No decision found');
    }
  }

};
