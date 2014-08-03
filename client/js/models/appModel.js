/**
 * appModel.js
 *
 * Model used by appView.
 *
 */

define(['backbone'], function(Backbone) {

    var appModel = Backbone.Model.extend({

        // properties
        defaults: {
            mode: 'test'
        },

        /**
         * initialize()
         *
         * initialize the model
         * @return {None}
         */
        initialize: function() {
        }

        /**
         * setStartMode()
         *
         * calls the server to find out what mode to start in.
         * @return {None}
         */
        , setStartMode: function() {
            appModel = this;

            $.ajax({
                type: 'GET'
                , url: '/start'

            }).done(function(data) {
                appModel.set('mode', data.mode);
            })
        }
    });

    return appModel;
})
