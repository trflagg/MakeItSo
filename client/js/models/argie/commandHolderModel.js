define([
    // need require to resolve circular reference w/ commandCollection
    'require'
    , 'underscore'
    , 'backbone'
    , './commandCollection'
    , './commandModel'
], function(require, _, Backbone, CommandCollection, CommandModel) {

    var commandHolderModel = CommandModel.extend({
        defaults: {
            childMessageCount: 0
            , children: {}
            , show_children: false
        }

        , initialize: function(attrs, options) {
            // call superclass' initialize()
            CommandModel.prototype.initialize.apply(this, arguments);

            // handle circular reference
            var CommandCollection = require('./commandCollection');
            this.set("children", new CommandCollection(attrs.children));

            if (attrs && attrs.children) {
                this.setChildren(attrs.children);
            }
        }

    });

    commandHolderModel.prototype.setChildren = function(children) {
        _.each(children, function(child) {
          child['parent'] = this;
        }, this);
        this.get("children").reset(children);
        this.trigger('change:children');
    }

    commandHolderModel.prototype.getChildren = function() {
        return _.map(this.get("children").models, function(child) {
            return child.get("id");
        });
    };

    commandHolderModel.prototype.toggleChildren = function() {
        this.set("show_children", !this.get("show_children"));
    };

    commandHolderModel.prototype.getChildById = function(id) {
        return this.get("children").findWhere({id: id});
    }

   return commandHolderModel;
});
