var ObjectID = require('mongodb').ObjectID
  , checkAdmin = require('../middleware/check-admin')
  , _ = require('underscore');

module.exports = function(app, db) {

  app.get('/admin/decisions'
    , checkAdmin
    , getDecisions);
  async function getDecisions(req, res) {
    // from indexController.start()
    res.render('index.ejs',{
      production: process.env.NODE_ENV === "production",
    });
  };

  app.get('/admin/decisions/all-ships'
    , checkAdmin
    , allShips);
  async function allShips(req, res) {
    var ships = await db.loadMultiple('Ship', {}, {shipName: 1, _id: 1});
    res.json({ ships: ships });
  }


  app.get('/admin/decisions/:ship_id/all'
    , checkAdmin
    , allDecisions);
  async function allDecisions(req, res) {
    var ship_id = req.params.ship_id;
    var decisions = await db.loadMultiple('Decision', {'ship._id': new ObjectID(ship_id)});

    decisions = _.sortBy(decisions, 'created').map(function(decision) {
      var result = decision;
      result.globals = decision.ship._globals;
      result.ship = decision.ship.toClient();
      return result;
    });

    res.json({decisions: decisions});
  }

  app.post('/admin/decision/:decision_id/*'
    , checkAdmin
    , runDecisionCommand);
  async function runDecisionCommand(req, res) {
    var decision_id = req.params.decision_id;
    var decision = await db.load('Decision', {'_id': new ObjectID(decision_id)});
    if (decision) {
      var ship = decision.ship;
      var command = req.params['0']
      var commands = command.split('/');
      command = commands.pop();
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
      res.json(result);
    } else {
      throw new Error('No decision found');
    }
  }

};
