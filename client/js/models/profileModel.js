/**
 * profileModel.js
 *
 * Represents a user profile.
 * Every user has 1 profile.
 *
 */

define(['backbone'], function(Backbone) {

    var profileModel = Backbone.Model.extend({

        // properties
        defaults: {
            name: ''
            , handiness: null
        }
    });

    return profileModel;
})
