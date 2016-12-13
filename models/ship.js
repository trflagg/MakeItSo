var util = require('util');

module.exports = function(db) {

    var Avatar = require('argie/models/avatar')(db, 'Ship')
        , Message = require('argie/models/message')(db)
        , MessageHolder = require('argie/models/messageHolder')(db)
        , systemWrapper = require('argie/models/systemWrapper')
        , AvatarWrapper = require('argie/models/avatarWrapper');

    Ship = function(doc) {
        Ship.super_.call(this, doc);
    }
    util.inherits(Ship, Avatar);

    Ship.prototype.initialize = function() {
        Ship.super_.prototype.initialize.call(this);

        this.lastResult = null;
        this.screen = null;
        this.shipName = null;
        this.profile_id = null;

        this.levels = {
            security: 1
            , medical: 1
            , empat: 1
            , engineer: 1
            , cultural: 1
            , upgrades: 1
            , info: 1
            , weapons: 1
            , shields: 1
            , sensors: 1
            , databank: 1
            , processors: 1
            , engines: 1
        }

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
        doc.lastResult = this.lastResult;
        doc.screen = this.screen;
        doc.levels = this.levels;
        doc.profile_id = this.profile_id;

        return doc;
    };

    Ship.prototype.loadFromDoc = function(doc) {
        Ship.super_.prototype.loadFromDoc.call(this, doc);

        if(doc.shipName) this.shipName = doc.shipName;
        if(doc.lastResult) this.lastResult = doc.lastResult;
        if(doc.screen) this.screen = doc.screen;
        if(doc.levels) this.levels = doc.levels;
        if(doc.profile_id) this.profile_id = doc.profile_id
    };

    Ship.prototype.validate = function() {
        if (this.shipName) {
            if (this.shipName.length < 3)
                throw new Error(message='shipName must be at least 3 characters.');

            if (!/^[a-zA-Z]+$/.test(this.shipName))
                throw new Error(message='shipName may only contain uppercase and lowercase letters.');
        }
    };

    Ship.prototype.startGame = function*() {
        var message = yield db.load('Message', {name: 'INIT'});
        var result = yield message.run(this)
        // show result of message
        this.lastResult = result;
    };

    Ship.prototype.runCommand = function* (command, child) {
        var result = yield Avatar.prototype.runMessage.call(this, command, child);

        this.lastResult = result;

        return result;
    };

    Ship.prototype.toClient = function() {
        var client_ship = {};

        client_ship.id = this._id;
        client_ship.shipName = this.shipName;
        client_ship.lastResult = this.lastResult;
        client_ship.screen = this.screen;
        client_ship.levels = this.levels;
        client_ship.commands = this.getCommandTextList();
        client_ship.location = this.getLocation();

        return client_ship;
    };

    Ship.prototype.getLevel = function(child) {
      return this.levels[child] || "";
    }

    Ship.prototype.increaseLevel = function(child) {
      if (this.levels[child]) {
        this.levels[child]++;
      }
    }

    // add to the system wrapper
    systemWrapper.prototype.registerFunction({
        functionName: 'setScreen'
        , functionBody: function(screenName) {
            this._avatar.screen = screenName;
        }
    });

  // add to the avatar wrapper
  AvatarWrapper.prototype.registerFunction({
    functionName: 'getLevel'
    , functionBody: function(child) {
      return this.avatar.getLevel(child);
    }
  });

  AvatarWrapper.prototype.registerFunction({
    functionName: 'pronoun'
    , functionBody: function() {

      if (this.avatar.getGlobal('gender') === 'female') {
        return {
          lowercase: 'she'
          , uppercase: 'She'
          , object: {
            lowercase: 'her'
            , uppercase: 'Her'
          }
          , possessive: {
            lowercase: 'her'
            , uppercase: 'Her'
            , adjective: {
              lowercase: 'hers'
              , uppercase: 'Hers'
            }
          }
        }
      } else {
        return {
          lowercase: 'he'
          , uppercase: 'He'
          , object: {
            lowercase: 'him'
            , uppercase: 'Him'
          }
          , possessive: {
            lowercase: 'his'
            , uppercase: 'His'
            , adjective: {
              lowercase: 'his'
              , uppercase: 'His'
            }
          }
        }
      }
    }
  });

  db.register('Ship', Ship);

    return Ship;
}
