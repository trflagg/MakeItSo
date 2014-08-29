
var request = require('superagent')
    , assert = require('assert')
    , should = require('should')
    , ObjectID = require('mongodb').ObjectID
    , helpers = require('../helpers');

describe('Ship controller', function() {
    var agent = request.agent()
        , profile_id
        , db
        , ship1
        , ship2;

    before(function*() {
        db = helpers.getCoDb();
        helpers.loadModels(db);

        agent = request.agent();
        result = yield helpers.coCreateSession(agent)
        profile_id = result.body.id;

        ship1 = db.create('Ship');
        ship1.shipName = 'ShipOne';
        ship1.profile_id = new ObjectID(profile_id);
        yield db.save('Ship', ship1);

        ship2 = db.create('Ship');
        ship2.shipName = 'ShipTwo';
        ship2.profile_id = new ObjectID(profile_id);
        yield db.save('Ship', ship2);
    });

    after(function*() {
        yield db.remove('Profile', {_id: profile_id});
        yield db.remove('Ship', {_id: ship1._id});
        yield db.remove('Ship', {_id: ship2._id});

        db.close();
    })

    describe('GET /ships/:id', function() {
        it('fails if no session', function(done) {
            // new agent without session cookie
            var new_agent = request.agent();

            new_agent
            .get('http://localhost:3000/ships/'+profile_id)
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(400);
                result.text.should.equal('session not found.');
                done();
            });
        });

        it('fails if :id doesnt match session', function(done) {
            agent
            .get('http://localhost:3000/ships/1234567890')
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(400);
                result.text.should.equal('session does not match param.');
                done();
            });
        });

        it('gets list of ships', function(done) {
            agent
            .get('http://localhost:3000/ships/'+profile_id)
            .end(function(err, result) {
                (err === null).should.be.true;
                var ships = result.body.ships;
                ships.should.have.length(2);
                ships.should.containDeep([{
                    _id: new String(ship1._id)
                    , shipName: 'ShipOne'
                }]);
                ships.should.containDeep([{
                    _id: ship2._id
                    , shipName: 'ShipTwo'
                }]);
                done();
            })
        })
   });
});
