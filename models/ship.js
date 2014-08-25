var util = require('util');

module.exports = function(db) {

    var Avatar = require('argie/models/avatar')(db, 'Ship')
        , MessageHolder = require('argie/models/messageHolder')(db);

    Ship = function(doc) {
        Ship.super_.call(this, doc);
    }
    util.inherits(Ship, Avatar);

    Ship.prototype.initialize = function() {
        Ship.super_.prototype.initialize.call(this);

        this.output = null;
        this.shipName = null;

        this.setNewMessageText('** New command added: %s **');
        // controls and crew members are child messageHolders
        var crew = new MessageHolder();
        var securityHolder = new MessageHolder();
        securityHolder.setNewMessageText('** New crew command added to crew->security: %s **');
        crew.addChild('security', securityHolder);
        var medicalHolder = new MessageHolder();
        medicalHolder.setNewMessageText('** New crew command added to crew->medical: %s **');
        crew.addChild('medical', medicalHolder);
        var empatHolder = new MessageHolder();
        empatHolder.setNewMessageText('** New crew command added to crew->empat: %s **');
        crew.addChild('empat', empatHolder);
        var engineeringHolder = new MessageHolder();
        engineeringHolder.setNewMessageText('** New crew command added to crew->engineering: %s **');
        crew.addChild('engineering', engineeringHolder);
        var culturalHolder = new MessageHolder();
        culturalHolder.setNewMessageText('** New crew command added to crew->cultural: %s **');
        crew.addChild('cultural', culturalHolder);
        var infoHolder = new MessageHolder();
        infoHolder.setNewMessageText('** New crew command added to crew->info: %s **');
        crew.addChild('info', infoHolder);
        this.addChild('crew', crew);

        var shipControls = new MessageHolder();
        var weaponHolder = new MessageHolder();
        weaponHolder.setNewMessageText('** New command added to ship_controls->weapons: %s **');
        shipControls.addChild('weapons', weaponHolder);
        var shieldHolder = new MessageHolder();
        shieldHolder.setNewMessageText('** New command added to ship_controls->shields: %s **');
        shipControls.addChild('shields', shieldHolder);
        var sensorHolder = new MessageHolder();
        sensorHolder.setNewMessageText('** New command added to ship_controls->sensors: %s **');
        shipControls.addChild('sensors', sensorHolder);
        var databankHolder = new MessageHolder();
        databankHolder.setNewMessageText('** New command added to ship_controls->databank: %s **');
        shipControls.addChild('databank', databankHolder);
        var processorHolder = new MessageHolder();
        processorHolder.setNewMessageText('** New command added to ship_controls->processor: %s **');
        shipControls.addChild('processor', processorHolder);
        var enginesHolder = new MessageHolder();
        enginesHolder.setNewMessageText('** New command added to ship_controls->engines: %s **');
        shipControls.addChild('engines', enginesHolder);
        this.addChild('ship_controls', shipControls);

        var dmHolder = new MessageHolder();
        dmHolder.setNewMessageText('** New Direct Message Received: %s **');
        this.addChild('direct_messages', dmHolder);
    };

    Ship.prototype.saveToDoc = function(doc) {
        Ship.super_.prototype.saveToDoc.call(this, doc);

        doc.shipName = this.shipName;
        doc.output = this.output;

        return doc;
    };

    Ship.prototype.loadFromDoc = function(doc) {
        Ship.super_.prototype.loadFromDoc.call(this, doc);

        this.shipName = doc.shipName;
        this.output = doc.output;
    };

    Ship.prototype.validate = function() {
        if (this.shipName) {
            if (this.shipName.length < 3)
                throw new Error(message='shipName must be at least 3 characters.');

            if (!/^[a-zA-Z]+$/.test(this.shipName))
                throw new Error(message='shipName may only contain uppercase and lowercase letters.');
        }
    }

    db.register('Ship', Ship);

    return Ship;
}
