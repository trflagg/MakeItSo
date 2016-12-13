/**
 * shipController.js
 *
 * For handling ship and shipList stuff
 */

var render = require('../render')
    , bodyParser = require('koa-body')
    , requireParams = require('../middleware/require-params')
    , idMatchesSession = require('../middleware/id-matches-session')
    , ObjectID = require('mongodb').ObjectID;

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
            ship.increaseLevel('shields');
            ship.increaseLevel('medical');
            ship.increaseLevel('sensors');
            ship.increaseLevel('info');
            ship.increaseLevel('processors');
            ship.increaseLevel('engineer');
            break;
          case 'ENTJ':
            ship.increaseLevel('weapons');
            ship.increaseLevel('security');
            ship.increaseLevel('databank');
            ship.increaseLevel('empat');
            ship.increaseLevel('processors');
            ship.increaseLevel('engineer');
            break;
          case 'INFP':
            ship.increaseLevel('shields');
            ship.increaseLevel('medical');
            ship.increaseLevel('databank');
            ship.increaseLevel('empat');
            ship.increaseLevel('upgrades');
            ship.increaseLevel('cultural');
            break;
          case 'ESFP':
            ship.increaseLevel('weapons');
            ship.increaseLevel('security');
            ship.increaseLevel('sensors');
            ship.increaseLevel('info');
            ship.increaseLevel('upgrades');
            ship.increaseLevel('cultural');
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
        var ship = yield db.load('Ship', {_id: new ObjectID(this.params.id)});
  console.log(commands);
        yield ship.runCommand(commands.pop(), commands.join('.'));
        yield db.save('Ship', ship);

        this.body = ship.toClient();
    }
}
