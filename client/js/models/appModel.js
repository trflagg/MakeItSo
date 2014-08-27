/**
 * appModel.js
 *
 * Model used by appView.
 *
 */

define(['backbone'
        , '../models/profileModel'

], function(Backbone
            , ProfileModel
) {

    var appModel = Backbone.Model.extend({

        // properties
        defaults: {
            mode: 'test'
            , profile: null
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
                // id is undefined if this is a new profile.
                appModel.set('id', data.id);
                var newProfile = new ProfileModel({
                    'id': appModel.get('id')
                });
                appModel.set('profile', newProfile);
                appModel.set('mode', data.mode);
            })
        }
    });

    return appModel;
})
