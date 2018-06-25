/**
 * shipController.js
 *
 * For handling ship and shipList stuff
 */

  var requireParams = require('../middleware/require-params')
  , idMatchesSession = require('../middleware/id-matches-session')
  , ObjectID = require('mongodb').ObjectID
  , Decision = require('../models/decision');

module.exports = function(app, db) {
  /**
   * getShipList()
   *
   * return list of the user's ships
   * @return {json}
   */
  app.get('/ships/:profile_id'
    , idMatchesSession(db)
    , getShipList);
  async function getShipList(req, res) {
    var ships = await db.loadMultiple('Ship'
      , {profile_id: req.params.profile._id}
      , {shipName: 1, _id: 1});
    res.json({
      ships: ships
    });
  }

  /**
   * POST /ship/:profile_id
   *
   * make new ship.
   * TODO: x-reference url profile_id vs form-data profile_id
   */
  app.post('/ship/:profile_id'
    , requireParams(['profile_id'
      , 'shipName'])
    , idMatchesSession(db)
    , newShip);
  async function newShip(req, res) {
    try {
      var ship = db.create('Ship');
      ship.profile_id = req.params.profile._id;
      ship.shipName = req.body['shipName'];
      ship.setGlobal('name', req.params.profile.name);
      ship.setGlobal('gender', req.params.profile.sex);
      ship.setGlobal('ship_name', ship.shipName);
      await ship.startGame();

      await db.save('Ship', ship);
      req.signedCookies.ship;
      res.cookie('ship', ship._id, {
        signed: true,
      });
      req.session.ship = ship._id;

      res.json(ship.toClient());
    } catch(e) {
      throw e;
    }
  }

  /**
   * PUT /ship/:profile_id/:id
   *
   * edit a ship
   * currently only sets crew names
   */
  app.put('/ship/:profile_id/:id'
    , idMatchesSession(db, {
      load: false
    })
    , editShip);
  async function editShip(req, res) {
    var ship = await db.load('Ship', {_id: new ObjectID(req.params.id)});

    // set names
    var crewChildren = req.body.crew.children;

    for (var i=0, ll=crewChildren.length; i<ll; i++) {
      var crew_id = crewChildren[i].id;

      // use default if empty
      var DEFAULT_NAMES = {
        security: 'Warf'
        , medical: 'Crusher'
        , info: 'Data'
        , empat: 'Troi'
        , engineering: 'LaForge'
        , cultural: 'Picard'
        , janitor: 'Thurgood'
      }

      if (crewChildren[i].name === "") {
        crewChildren[i].name = DEFAULT_NAMES[crew_id];
      }
      // avatarWrapper can access globals
      ship.setGlobal(crew_id, crewChildren[i].name);
      // but save to messageHolder name property as well
      ship.child('crew').child(crew_id).setName(crewChildren[i].name);
    }

    await db.save('Ship', ship);

    res.json(ship.toClient());

  }

  app.post('/ship/:profile_id/:id/starting_levels'
    , idMatchesSession(db, {load: false})
    , setStartingLevels);
  async function setStartingLevels(req, res) {
    try {
      var ship = await db.load('Ship', {_id: new ObjectID(req.params.id)});

      switch (req.body.type_selected) {
        case 'ISTJ':
          ship.setGlobal('style', 'inspector');
          ship.increaseLevel('ship_controls.shields');
          ship.increaseLevel('crew.medical');
          ship.increaseLevel('ship_controls.sensors');
          ship.increaseLevel('crew.info');
          ship.increaseLevel('ship_controls.processor');
          ship.increaseLevel('crew.engineering');
          break;
        case 'ENTJ':
          ship.setGlobal('style', 'fieldmarshall');
          ship.increaseLevel('ship_controls.weapons');
          ship.increaseLevel('crew.security');
          ship.increaseLevel('ship_controls.databank');
          ship.increaseLevel('crew.empat');
          ship.increaseLevel('ship_controls.processor');
          ship.increaseLevel('crew.engineering');
          break;
        case 'INFP':
          ship.setGlobal('style', 'mediator');
          ship.increaseLevel('ship_controls.shields');
          ship.increaseLevel('crew.medical');
          ship.increaseLevel('ship_controls.databank');
          ship.increaseLevel('crew.empat');
          ship.increaseLevel('ship_controls.misc');
          ship.increaseLevel('crew.cultural');
          break;
        case 'ESFP':
          ship.setGlobal('style', 'performer');
          ship.increaseLevel('ship_controls.weapons');
          ship.increaseLevel('crew.security');
          ship.increaseLevel('ship_controls.sensors');
          ship.increaseLevel('crew.info');
          ship.increaseLevel('ship_controls.misc');
          ship.increaseLevel('crew.cultural');
          break;
      }
      await db.save('Ship', ship);

      res.json(ship.toClient());
    } catch(e) {
      throw e;
    }
  }

  /**
   * GET /ship/:profile_id/:id
   *
   * get current ship data
   * TODO: load ship using a middleware function
   */
  app.get('/ship/:profile_id/:id'
    , idMatchesSession(db, {
      load: false
    })
    , getShip);
  async function getShip(req, res) {
    var ship = await db.load('Ship', {_id: new ObjectID(req.params.id)});

    res.json(ship.toClient());
  }

  app.get('/ship/:profile_id/:id/pollForYield/'
    , idMatchesSession(db, {load: false})
    , pollForYield);
  async function pollForYield(req, res) {
    var currentDatetime = new Date();
    var ship = await db.load('Ship', {_id: new ObjectID(req.params.id)});

    var result = await ship.runAllYields();
    if (result !== '') {
      ship.lastResult = result;
      await db.save('Ship', ship);
    }

    res.json(ship.toClient());
  }

  /**
   * POST ship/:profile_id/:id/:command
   *
   * runs command with given text on ship
   */
  app.post('/ship/:profile_id/:id/*'
    , idMatchesSession(db, {load: false})
    , runCommand);
  async function runCommand(req, res) {
    var command = req.params['0'];
    var commands = command.split('/');
    command = commands.pop();
    var child = commands.join('.');
    var ship = await db.load('Ship', {_id: new ObjectID(req.params.id)});
    var message = ship.message(command, child);
    await ship.runCommand(command, child);
    await db.save('Ship', ship);

    var decision = db.create('Decision');
    await decision.fromShipCommandAndChild(ship, message, command, child);
    res.json(ship.toClient());
  }



}
