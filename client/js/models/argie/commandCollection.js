define([
    'require',
    'backbone',
    './commandModel',
    './commandHolderModel'
], function(require, Backbone, CommandModel, CommandHolderModel) {

    var commandCollection = Backbone.Collection.extend({

        model: function(attrs, options) {
            if (attrs.children) {
                // handle circular reference
                var CommandHolderModel = require('./commandHolderModel');
                return new CommandHolderModel(attrs, options);
            }
            else {
                return new CommandModel(attrs, options);
            }
        }
    });

   return commandCollection;
});
