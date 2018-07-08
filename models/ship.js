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
    this.lastChildRun = null;
    this.showHeader = true;
    this.screen = null;
    this.shipName = null;
    this.profile_id = null;
    this.lastDM = null;

    this.setNewMessageText(this.newMessageText());
    // controls and crew members are child messageHolders
    var crew = new MessageHolder();
    var securityHolder = new MessageHolder();
    securityHolder.setNewMessageText(this.newMessageText('crew -> security'));
    securityHolder.supportLevels();
    crew.addChild('security', securityHolder);
    var medicalHolder = new MessageHolder();
    medicalHolder.setNewMessageText(this.newMessageText('crew -> medical'));
    medicalHolder.supportLevels();
    crew.addChild('medical', medicalHolder);
    var empatHolder = new MessageHolder();
    empatHolder.setNewMessageText(this.newMessageText('crew -> empat'));
    empatHolder.supportLevels();
    crew.addChild('empat', empatHolder);
    var engineeringHolder = new MessageHolder();
    engineeringHolder.setNewMessageText(this.newMessageText('crew -> engineer'));
    engineeringHolder.supportLevels();
    crew.addChild('engineering', engineeringHolder);
    var culturalHolder = new MessageHolder();
    culturalHolder.setNewMessageText(this.newMessageText('crew -> cultural'));
    culturalHolder.supportLevels();
    crew.addChild('cultural', culturalHolder);
    var infoHolder = new MessageHolder();
    infoHolder.setNewMessageText(this.newMessageText('crew -> info'));
    infoHolder.supportLevels();
    crew.addChild('info', infoHolder);
    var janitorHolder = new MessageHolder();
    janitorHolder.setNewMessageText(this.newMessageText('crew -> janitor'));
    janitorHolder.supportLevels();
    crew.addChild('janitor', janitorHolder);
    this.addChild('crew', crew);

    var shipControls = new MessageHolder();
    var weaponHolder = new MessageHolder();
    weaponHolder.setNewMessageText(this.newMessageText('ship controls -> weapons'));
    weaponHolder.supportLevels();
    shipControls.addChild('weapons', weaponHolder);
    var shieldHolder = new MessageHolder();
    shieldHolder.setNewMessageText(this.newMessageText('ship controls -> shields'));
    shieldHolder.supportLevels();
    shipControls.addChild('shields', shieldHolder);
    var sensorHolder = new MessageHolder();
    sensorHolder.setNewMessageText(this.newMessageText('ship controls -> sensors'));
    sensorHolder.supportLevels();
    shipControls.addChild('sensors', sensorHolder);
    var databankHolder = new MessageHolder();
    databankHolder.setNewMessageText(this.newMessageText('ship controls -> databank'));
    databankHolder.supportLevels();
    shipControls.addChild('databank', databankHolder);
    var processorHolder = new MessageHolder();
    processorHolder.setNewMessageText(this.newMessageText('ship controls -> processor'));
    processorHolder.supportLevels();
    shipControls.addChild('processor', processorHolder);
    var miscHolder = new MessageHolder();
    miscHolder.setNewMessageText(this.newMessageText('ship controls -> misc'));
    miscHolder.supportLevels();
    shipControls.addChild('misc', miscHolder);
    this.addChild('ship_controls', shipControls);

    var dmHolder = new MessageHolder();
    dmHolder.setNewMessageText("<span class='new_message'>New message received: %s </span>");
    dmHolder.setRecordUnread(true);
    this.addChild('direct_messages', dmHolder);
  };

  Ship.prototype.newMessageText = function(childName) {
    var line = "<span class='new_message'>New command added";
    if (childName) {
      line += " to " + childName;
    }
    return line + ": %s </span>";
  }

  Ship.prototype.saveToDoc = function(doc) {
    Ship.super_.prototype.saveToDoc.call(this, doc);

    doc.shipName = this.shipName;
    doc.lastResult = this.lastResult;
    doc.lastChildRun = this.lastChildRun;
    doc.lastDM = this.lastDM;
    doc.showHeader = this.showHeader;
    doc.screen = this.screen;
    doc.profile_id = this.profile_id;

    return doc;
  };

  Ship.prototype.loadFromDoc = function(doc) {
    Ship.super_.prototype.loadFromDoc.call(this, doc);

    if(doc.shipName) this.shipName = doc.shipName;
    if(doc.lastResult) this.lastResult = doc.lastResult;
    if(doc.lastChildRun) this.lastChildRun = doc.lastChildRun;
    if(doc.lastDM) this.lastDM = doc.lastDM;
    if(doc.showHeader) this.showHeader = doc.showHeader;
    if(doc.screen) this.screen = doc.screen;
    if(doc.profile_id) this.profile_id = doc.profile_id
  };

  Ship.prototype.validate = function() {
    if (this.shipName) {
      if (this.shipName.length < 3)
        throw new Error(message='shipName must be at least 3 characters.');

      if (!/^[a-zA-Z0-9]+$/.test(this.shipName))
        throw new Error(message='shipName may only contain uppercase and lowercase letters.');
    }
  };

  Ship.prototype.startGame = async function() {
    var message = await db.load('Message', {name: 'INIT_INIT'});
    var result = await message.run(this)
    // show result of message
    this.lastResult = result;
  };

  Ship.prototype.runCommand = async function (command, child) {
    this.lastChildRun = child;
    var result = await this.runAllYields();
    result = result + await Avatar.prototype.runMessage.call(this, command, child);
    result = result + await this.runAllYields();

    //dm's stored in lastDM
    if (child === 'direct_messages') {
      this.lastDM = result;
    } else {
      this.lastResult = this.addCommandToResult(command, result);
    }

    await Decision.prototype.fromShipCommandAndChild(this, command, child);

    return result;
  };

  Ship.prototype.runAllYields = async function() {
    var result = '';
    while(this.nextYieldOffset(new Date()) < 0) {
      var nextYield = this.nextYield();
      this.removeYield(nextYield.message);
      result = result + await this.runMessageName(nextYield.message);
      await Decision.prototype.fromShipCommandAndChild(this, nextYield.message, null);
    }
    return result;
  }

  Ship.prototype.addCommandToResult = function(command, result) {
    if (this.screen === 'TITLE' || this.screen === 'SIMPLE') {
      return result;
    }

    return `{% START_COMMAND_NAME %}\n${command.toUpperCase()}\n{% END_COMMAND_NAME %}\n${result}`;
  }

  Ship.prototype.toClient = function() {
    var client_ship = {};

    client_ship.id = this._id;
    client_ship.shipName = this.shipName;
    client_ship.lastResult = this.lastResult;
    client_ship.lastChildRun = this.lastChildRun;
    client_ship.lastDM = this.lastDM;
    client_ship.screen = this.screen;
    client_ship.showHeader = this.showHeader;
    client_ship.commands = this.getCommandTextList();
    client_ship.location = this.getLocation();
    client_ship.lastUpdate = new Date();
    client_ship.timers = this._timers;
    client_ship.nextYield = this.nextYieldOffset();

    return client_ship;
  };

  Ship.prototype.crewName = function(crew) {
    var name = this.getGlobal(crew);
    var result = '';
    switch(crew) {
      case 'security':
        result = 'Security Ofc. '+name;
        break;
      case 'medical':
        result = 'Medical Ofc. '+name;
        break;
      case 'info':
        result = 'Information Ofc. '+name;
        break;
      case 'empat':
        result = 'Empat '+name;
        break;
      case 'engineering':
        result = 'Engineer '+name;
        break;
      case 'cultural':
        result = 'Cultural Ofc. '+name;
        break;
      case 'janitor':
        result = 'Sanitation Eng. '+name;
        break;
    }
    return result;
  }

  Ship.prototype.getImportantGlobals = function() {
    return {
      name: this.getGlobal('name'),
      crew: {
        security: this.getGlobal('security'),
        medical: this.getGlobal('medical'),
        info: this.getGlobal('info'),
        empat: this.getGlobal('empat'),
        engineering: this.getGlobal('engineering'),
        cultural: this.getGlobal('cultural'),
        janitor: this.getGlobal('janitor'),
      },
      gender: this.getGlobal('gender'),
      ship_name: this.getGlobal('ship_name'),
      style: this.getGlobal('style'),
    }
  }

  Ship.prototype.setImportantGlobals = function(globals) {
    this.setGlobal('name', globals.name);
    this.setGlobal('gender', globals.gender);
    this.setGlobal('ship_name', globals.ship_name);
    this.setGlobal('security', globals.crew.security);
    this.setGlobal('medical', globals.crew.medical);
    this.setGlobal('info', globals.crew.info);
    this.setGlobal('empat', globals.crew.empat);
    this.setGlobal('engineering', globals.crew.engineering);
    this.setGlobal('cultural', globals.crew.cultural);
    this.setGlobal('janitor', globals.crew.janitor);
    this.setGlobal('style', globals.style);
  }

  // add to the system wrapper
  systemWrapper.prototype.registerFunction({
    functionName: 'enterRedAlert',
    functionBody: function() {
      this._avatar.screen = 'REDALERT';
      return "ENTERING RED ALERT\n" +
        "Note: Events may happen in real time during red alert." +
        "Not acting quickly enough may affect the outcome."
    }
  });

  systemWrapper.prototype.registerFunction({
    functionName: 'exitRedAlert',
    functionBody: function() {
      this._avatar.screen = 'BRIDGE';
      return "EXITING RED ALERT";
    }
  });

  systemWrapper.prototype.registerFunction({
    functionName: 'setScreen'
    , functionBody: function(screenName) {
      this._avatar.screen = screenName;
    }
  });

  systemWrapper.prototype.registerFunction({
    functionName: 'hideHeader'
    , functionBody: function() {
      this._avatar.showHeader = false;
    }
  });

  systemWrapper.prototype.registerFunction({
    functionName: 'showHeader'
    , functionBody: function() {
      this._avatar.showHeader = true;
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
    functionName: 'crew_member_intercom'
    , functionBody: function(crew) {
      var result = '--' + this.avatar.crewName(crew);
      result += " [[over the intercom]]:: ";
      return result;
    }
  });

  AvatarWrapper.prototype.registerFunction({
    functionName: 'crew_member'
    , functionBody: function(crew) {
      var result = '--' + this.avatar.crewName(crew);
      result += ":: ";
      return result;
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
