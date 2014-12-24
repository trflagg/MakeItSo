var should = require('should')
    , assert = require('assert')
    , helpers = require('../helpers');

describe('Ship object', function() {
    var db
        , ship
        , ship_id;

    before(function() {
        db = helpers.getCoDb();
        helpers.loadModels(db);
    });

    after(function() {
        db.deleteAll('Ship');
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

    it('should fail to save if shipName is too short', function*() {
        ship.shipName = 'yo';
        try {
            yield db.save('Ship', ship)
        } catch(e) {
            e.message.should.equal('shipName must be at least 3 characters.');
        }
    });

    it('should fail to save if shipName is not only letters', function*() {
        ship.shipName = 'yo.p';
        try {
            yield db.save('Ship', ship);
        } catch(e) {
            e.message.should.equal('shipName may only contain uppercase and lowercase letters.');
        }
    });

    it('should save to the db', function*() {
        ship.shipName = 'Yomata';

        yield db.save('Ship', ship);
        ship_id = ship._id;
    }),

    it('should load from db', function*() {
        var loaded_ship = yield db.load('Ship', {_id: ship_id})
        loaded_ship.shipName.should.equal('Yomata');
    }),

    it('should only load from projection', function*() {
        var loaded_ship = yield db.load('Ship', {_id: ship_id}, {shipName: 1});
        loaded_ship.shipName.should.equal('Yomata');
        loaded_ship.should.not.have.property('profile_id');
        loaded_ship.should.not.have.property('_children');
    })

    it('should load with INIT message when startGame is called', function*() {
        var loaded_ship = yield db.load('Ship', {_id: ship_id});
        yield loaded_ship.startGame();

        var ship_client = loaded_ship.toClient();
        ship_client.lastResult.should.equal('\nThis is the INIT message.\n\n\nThis is the START message.\n\n\n\n');
        ship_client.screen.should.equal('TITLE');
        ship_client.commands.should.containDeep([{
            text: 'message1'
        }]);
        ship_client.commands.should.containDeep([{
            text: 'message2'
        }]);
    })
});
