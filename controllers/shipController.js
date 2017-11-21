/**
 * shipController.js
 *
 * For handling ship and shipList stuff
 */

var render = require('../render')
    , bodyParser = require('koa-body')
    , requireParams = require('../middleware/require-params')
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
    function *getShipList() {
        var ships = yield db.loadMultiple('Ship'
                    , {profile_id: this.params.profile._id}
                    , {shipName: 1, _id: 1});
        this.body = {
            ships: ships
        };
    }

    /**
     * POST /ship/:profile_id
     *
     * make new ship.
     * TODO: x-reference url profile_id vs form-data profile_id
     */
    app.post('/ship/:profile_id'
                , bodyParser()
                , requireParams(['profile_id'
                                , 'shipName'])
                , idMatchesSession(db)
                , newShip);
    function *newShip() {
        try {
            var ship = db.create('Ship');
            ship.profile_id = this.params.profile._id;
            ship.shipName = this.request.body['shipName'];
            ship.setGlobal('name', this.params.profile.name);
            ship.setGlobal('gender', this.params.profile.sex);
            ship.setGlobal('ship_name', ship.shipName);
            yield ship.startGame();

            yield db.save('Ship', ship);
            this.cookies.get('ship');
            this.cookies.set('ship', ship._id);
            this.session.ship = ship._id;

            this.body = ship.toClient();
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
            , bodyParser()
            , idMatchesSession(db, {
                load: false
            })
            , editShip);
    function *editShip() {
        var ship = yield db.load('Ship', {_id: new ObjectID(this.params.id)});

        // set names
        var crewChildren = this.request.body.crew.children;

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
            }

            if (crewChildren[i].name === "") {
                crewChildren[i].name = DEFAULT_NAMES[crew_id];
            }
            // avatarWrapper can access globals
            ship.setGlobal(crew_id, crewChildren[i].name);
            // but save to messageHolder name property as well
            ship.child('crew').child(crew_id).setName(crewChildren[i].name);
        }

        yield db.save('Ship', ship);

        this.body = ship.toClient();

    }

    app.post('/ship/:profile_id/:id/starting_levels'
            , bodyParser()
            , idMatchesSession(db, {load: false})
            , setStartingLevels);
    function *setStartingLevels() {
      try {
        var ship = yield db.load('Ship', {_id: new ObjectID(this.params.id)});

        switch (this.request.body.type_selected) {
          case 'ISTJ':
            ship.increaseLevel('ship_controls.shields');
            ship.increaseLevel('crew.medical');
            ship.increaseLevel('ship_controls.sensors');
            ship.increaseLevel('crew.info');
            ship.increaseLevel('ship_controls.processor');
            ship.increaseLevel('crew.engineering');
            break;
          case 'ENTJ':
            ship.increaseLevel('ship_controls.weapons');
            ship.increaseLevel('crew.security');
            ship.increaseLevel('ship_controls.databank');
            ship.increaseLevel('crew.empat');
            ship.increaseLevel('ship_controls.processor');
            ship.increaseLevel('crew.engineering');
            break;
          case 'INFP':
            ship.increaseLevel('ship_controls.shields');
            ship.increaseLevel('crew.medical');
            ship.increaseLevel('ship_controls.databank');
            ship.increaseLevel('crew.empat');
            ship.increaseLevel('ship_controls.misc');
            ship.increaseLevel('crew.cultural');
            break;
          case 'ESFP':
            ship.increaseLevel('ship_controls.weapons');
            ship.increaseLevel('crew.security');
            ship.increaseLevel('ship_controls.sensors');
            ship.increaseLevel('crew.info');
            ship.increaseLevel('ship_constrols.misc');
            ship.increaseLevel('crew.cultural');
            break;
        }
        yield db.save('Ship', ship);

        this.body = ship.toClient();
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
    function *getShip() {
        var ship = yield db.load('Ship', {_id: new ObjectID(this.params.id)});

        this.body = ship.toClient();
    }

    /**
     * POST ship/:profile_id/:id/:command
     *
     * runs command with given text on ship
     */
    app.post('/ship/:profile_id/:id/:command+'
            , idMatchesSession(db, {load: false})
            , runCommand);
    function *runCommand() {
        console.log(this.params.command);
        var commands = this.params.command.split('/');
        var command = commands.pop();
        var child = commands.join('.');
        var ship = yield db.load('Ship', {_id: new ObjectID(this.params.id)});
        yield ship.runCommand(command, child);
        yield db.save('Ship', ship);

        console.log('before decision');
        console.log(Decision);
        var decision = db.create('Decision');
        yield decision.fromShipCommandAndChild(ship, command, child);
        this.body = ship.toClient();
    }
}
