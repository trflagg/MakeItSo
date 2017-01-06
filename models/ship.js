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

        this.setNewMessageText('** New command added: %s **');
        // controls and crew members are child messageHolders
        var crew = new MessageHolder();
        var securityHolder = new MessageHolder();
        securityHolder.setNewMessageText('** New crew command added to crew->security: %s **');
        securityHolder.supportLevels();
        crew.addChild('security', securityHolder);
        var medicalHolder = new MessageHolder();
        medicalHolder.setNewMessageText('** New crew command added to crew->medical: %s **');
        medicalHolder.supportLevels();
        crew.addChild('medical', medicalHolder);
        var empatHolder = new MessageHolder();
        empatHolder.setNewMessageText('** New crew command added to crew->empat: %s **');
        empatHolder.supportLevels();
        crew.addChild('empat', empatHolder);
        var engineeringHolder = new MessageHolder();
        engineeringHolder.setNewMessageText('** New crew command added to crew->engineering: %s **');
        engineeringHolder.supportLevels();
        crew.addChild('engineering', engineeringHolder);
        var culturalHolder = new MessageHolder();
        culturalHolder.setNewMessageText('** New crew command added to crew->cultural: %s **');
        culturalHolder.supportLevels();
        crew.addChild('cultural', culturalHolder);
        var infoHolder = new MessageHolder();
        infoHolder.setNewMessageText('** New crew command added to crew->info: %s **');
        infoHolder.supportLevels();
        crew.addChild('info', infoHolder);
        this.addChild('crew', crew);

        var shipControls = new MessageHolder();
        var weaponHolder = new MessageHolder();
        weaponHolder.setNewMessageText('** New command added to ship_controls->weapons: %s **');
        weaponHolder.supportLevels();
        shipControls.addChild('weapons', weaponHolder);
        var shieldHolder = new MessageHolder();
        shieldHolder.setNewMessageText('** New command added to ship_controls->shields: %s **');
        shieldHolder.supportLevels();
        shipControls.addChild('shields', shieldHolder);
        var sensorHolder = new MessageHolder();
        sensorHolder.setNewMessageText('** New command added to ship_controls->sensors: %s **');
        sensorHolder.supportLevels();
        shipControls.addChild('sensors', sensorHolder);
        var databankHolder = new MessageHolder();
        databankHolder.setNewMessageText('** New command added to ship_controls->databank: %s **');
        databankHolder.supportLevels();
        databankHolder.setRecordUnread(true);
        shipControls.addChild('databank', databankHolder);
        var processorHolder = new MessageHolder();
        processorHolder.setNewMessageText('** New command added to ship_controls->processor: %s **');
        processorHolder.supportLevels();
        shipControls.addChild('processor', processorHolder);
        var enginesHolder = new MessageHolder();
        enginesHolder.setNewMessageText('** New command added to ship_controls->engines: %s **');
        enginesHolder.supportLevels();
        shipControls.addChild('engines', enginesHolder);
        this.addChild('ship_controls', shipControls);

        var dmHolder = new MessageHolder();
        dmHolder.setNewMessageText('** New Direct Message Received: %s **');
        dmHolder.setRecordUnread(true);
        this.addChild('direct_messages', dmHolder);
    };

    Ship.prototype.saveToDoc = function(doc) {
        Ship.super_.prototype.saveToDoc.call(this, doc);

        doc.shipName = this.shipName;
        doc.lastResult = this.lastResult;
        doc.screen = this.screen;
        doc.profile_id = this.profile_id;

        return doc;
    };

    Ship.prototype.loadFromDoc = function(doc) {
        Ship.super_.prototype.loadFromDoc.call(this, doc);

        if(doc.shipName) this.shipName = doc.shipName;
        if(doc.lastResult) this.lastResult = doc.lastResult;
        if(doc.screen) this.screen = doc.screen;
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
        client_ship.commands = this.getCommandTextList();
        client_ship.location = this.getLocation();

        return client_ship;
    };

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
