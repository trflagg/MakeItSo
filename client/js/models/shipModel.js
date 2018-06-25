/**
 * shipModel.js
 *
 * User's current ship
 *
 */

var Backbone = require('backbone')
  , _ = require('underscore')
  , CommandHolderModel = require('./argie/commandHolderModel');

module.exports =  shipModel = CommandHolderModel.extend({

  urlRoot: function() {
    return 'ship/' + this.get('profile_id')
  }

  // properties
  , defaults: {
    shipName: ''
    , lastResult: ''
    , directMessages: new CommandHolderModel({
      text: 'direct messages',
      id: 'direct_messages'
    })
    , crew: new CommandHolderModel({
      text: 'crew'
    })
    , shipControls: new CommandHolderModel({
      text: 'ship controls',
      id: 'ship_controls'
    })
    , show_children: true
  }

  , parse: function(response, options) {

    this.set('id', response.id);
    this.set('shipName', response.shipName);
    this.set('output', response.output);
    this.set('lastResult', response.lastResult);
    this.set('lastChildRun', response.lastChildRun);
    this.set('lastUpdate', response.lastUpdate);
    this.set('lastDM', response.lastDM);
    this.set('location', response.location);
    this.set('showHeader', response.showHeader);
    this.set('screen', response.screen);
    this.set('timers', response.timers);

    if (response.globals) {
      this.set('globals', response.globals);
    }

    if (response.profile_id) {
      this.set('profile_id', response.profile_id);
    }

    var rootCommands = [];
    var commands = response.commands;
    for (var i=0, ll=commands.length; i<ll; i++) {
      var command = commands[i]
      switch (command.text) {

        case 'crew':
          this.get("crew").set("childMessageCount", command.childMessageCount);
          this.get("crew").set("visible", command.visible);
          this.get("crew").setChildren(command.children);
          break;
        case 'ship_controls':
          this.get("shipControls").set("childMessageCount", command.childMessageCount);
          this.get("shipControls").set("visible", command.visible);
          this.get("shipControls").setChildren(command.children);
          break;
        case 'direct_messages':
          this.get("directMessages").setChildren(command.children);
          break;

        default:
          // root-level command
          rootCommands.push(command);
      }
    }
    this.setChildren(rootCommands);

    if (response.nextYield) {
      setTimeout(this.pollForYield.bind(this), response.nextYield);
    }

    this.trigger('parse_done');
  }

  /**
   * Copied from models/ship.js
   */
  , validate: function(attrs, options) {
    if (this.shipName) {
      if (this.shipName.length < 3)
        throw new Error(message='shipName must be at least 3 characters.');

      if (!/^[a-zA-Z]+$/.test(this.shipName))
        throw new Error(message='shipName may only contain uppercase and lowercase letters.');
    }
  }

  , runCommand: function(commandPath) {
    var ship = this;
    var commandURL = this.url() + '/' + _.map(commandPath.split('.'), encodeURIComponent).join('/');

    $.ajax({
      type: 'POST'
      , url: commandURL
    }).done(function(data) {
      ship.parse(data);
    })
  }

  , pollForYield: function() {
    var ship = this;
    $.ajax({
      type: 'GET'
      , url: this.url() + '/pollForYield'
    }).done(function(data) {
      ship.parse(data);
    });
  }

});
