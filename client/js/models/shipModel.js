/**
 * shipModel.js
 *
 * User's current ship
 *
 */

define([
    'backbone'
    , './argie/commandHolderModel'
], function(Backbone
            , CommandHolderModel) {

    var shipModel = CommandHolderModel.extend({

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
            this.set('location', response.location);

            var rootCommands = [];
            var commands = response.commands;
            for (var i=0, ll=commands.length; i<ll; i++) {
                var command = commands[i]
                switch (command.text) {

                    case 'crew':
                        this.get("crew").set("childMessageCount", command.childMessageCount);
                        this.get("crew").setChildren(command.children);
                        break;
                    case 'ship_controls':
                        this.get("shipControls").set("childMessageCount", command.childMessageCount);
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
            this.set('screen', response.screen);
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

    });

    return shipModel;
})
