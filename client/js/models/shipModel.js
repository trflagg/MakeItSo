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
            , directMessages: new CommandHolderModel({
                text: 'direct messages'
            })
            , crew: new CommandHolderModel({
                text: 'crew'
            })
            , shipControls: new CommandHolderModel({
                text: 'ship controls'
            })
        }

        , parse: function(response, options) {

            this.set('id', response.id);
            this.set('shipName', response.shipName);
            this.set('output', response.output);

            var commands = response.commands;
            for (var i=0, ll=commands.length; i<ll; i++) {
                var command = commands[i]

                switch (command.text) {

                    case 'crew':
                        this.get("crew").set("childMessageCount", command.childMessageCount);
                        this.get("crew").setChildren(command.children);
                        break
                    case 'ship_controls':
                        this.get("shipControls").setChildren(command.children);
                        break
                    case 'direct_messages':
                        this.get("directMessages").setChildren(command.children);
                        break
                }
            }
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

    });

    return shipModel;
})
