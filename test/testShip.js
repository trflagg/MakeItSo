var should = require('should')
    , assert = require('assert')
    , helpers = require('./helpers');

describe('Ship object', function() {
    var db
        , ship
        , _id;

    before(function() {
        db = helpers.getDb();
        require('../models/ship')(db);
    });

    after(function() {
        db.close();
    });

    it('should make a new object', function() {
        ship = db.create('Ship');
        assert.equal(ship.shipName, null);
        assert.equal(ship.output, null);
    }),

    it('should have all of its children and subchildren', function() {
        ship._children.crew.should.not.equal(null);
        ship._children.crew._children.security.should.not.equal(null);
        ship._children.crew._children.medical.should.not.equal(null);
        ship._children.crew._children.empat.should.not.equal(null);
        ship._children.crew._children.cultural.should.not.equal(null);
        ship._children.crew._children.info.should.not.equal(null);
        ship._children.ship_controls.should.not.equal(null);
        ship._children.ship_controls._children.weapons.should.not.equal(null);
        ship._children.ship_controls._children.shields.should.not.equal(null);
        ship._children.ship_controls._children.sensors.should.not.equal(null);
        ship._children.ship_controls._children.databank.should.not.equal(null);
        ship._children.ship_controls._children.processor.should.not.equal(null);
        ship._children.ship_controls._children.engines.should.not.equal(null);
        ship._children.direct_messages.should.not.equal(null);
    }),

    it('should fail to save if shipName is too short', function(done) {
        ship.shipName = 'yo';
        db.save('Ship', ship, function(err) {
            err.message.should.equal('shipName must be at least 3 characters.');
            done();
        });
    });

    it('should fail to save if shipName is not only letters', function(done) {
        ship.shipName = 'yo.p';
        db.save('Ship', ship, function(err) {
            err.message.should.equal('shipName may only contain uppercase and lowercase letters.');
            done();
        });
    });

    it('should save to the db', function(done) {
        ship.shipName = 'Yomata';

        db.save('Ship', ship, function(err) {
            assert.equal(err, null);
            _id = ship._id;

            done();
        });
    }),

    it('should load from db', function(done) {
        db.load('Ship', {_id: _id}, function(err, loaded_ship) {
            assert.equal(err, null);
            loaded_ship.shipName.should.equal('Yomata');

            done();
        });
    })
});
