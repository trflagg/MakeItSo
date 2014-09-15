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

        urlRoot: 'ship'

        // properties
        , defaults: {
            shipName: ''
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
