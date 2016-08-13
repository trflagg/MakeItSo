    var Backbone = require('backbone')
    , CommandModel = require('./commandModel')
    , CommandHolderModel = require('./commandHolderModel');

    module.exports = commandCollection = Backbone.Collection.extend({

        model: function(attrs, options) {
            if (attrs.children) {
                // handle circular reference
                return new CommandHolderModel(attrs, options);
            }
            else {
                return new CommandModel(attrs, options);
            }
        }
    });
