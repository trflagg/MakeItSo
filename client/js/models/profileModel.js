/**
 * profileModel.js
 *
 * Represents a user profile.
 * Every user has 1 profile.
 *
 */

define(['backbone'], function(Backbone) {

    var profileModel = Backbone.Model.extend({

        urlRoot: 'profile'

        // properties
        , defaults: {
            name: ''
            , handiness: null
        }

        /**
         * Copied from models/profile.js
         */
        , validate: function(attrs, options) {
            if (attrs.name) {
                if (attrs.name.length < 3) {
                    return 'name must be at least 3 characters.';
                }
                if (!/^[a-zA-Z]+$/.test(attrs.name)) {
                    return 'name may only contain uppercase and lowercase letters.';
                }
            }

            if (attrs.handiness) {
                if (attrs.handiness !== 'right' &&
                    attrs.handiness !== 'left') {
                    return 'handiness must be either right or left.';
                }
            }

            if (attrs.sex) {
                if (attrs.sex !== 'male' &&
                    attrs.sex !== 'female') {
                    return 'sex must be either male or female.';
                }
            }
        }
    });

    return profileModel;
})
