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
     * POST /ship
     *
     * make new ship.
     */
    app.post('/ship/'
                , bodyParser()
                , requireParams(['profile_id'
                                , 'shipName'])
                , idMatchesSession(db, {
                    source: 'body'
                })
                , newShip);
    function *newShip() {
        try {
            var ship = db.create('Ship');
            ship.profile_id = this.params.profile._id;
            ship.shipName = this.request.body['shipName'];
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
     * PUT /ship/:id
     *
     * edit a ship
     * currently only sets crew names
     */
    app.put('/ship/:id'
            , bodyParser()
            , requireParams(['profile_id'])
            , idMatchesSession(db, {
                source: 'body'
                , load: false
            })
            , editShip);
    function *editShip() {
        var ship = yield db.load('Ship', {_id: new ObjectID(this.params.id)});

        // set names
        var crewChildren = this.request.body.crew.children;

        for (var i=0, ll=crewChildren.length; i<ll; i++) {
            var crew_id = crewChildren[i].id;
            console.log(crew_id);
            console.dir(ship.child('crew').child(crew_id));
            ship.child('crew').child(crew_id).setName(crewChildren[i].name);
        }

        yield db.save('Ship', ship);

        this.body = ship.toClient();

    }
}
