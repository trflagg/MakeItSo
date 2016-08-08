    var _ = require('underscore')
    , Backbone = require('backbone')
    , CommandCollection = require('./commandHolderModel')
    , CommandModel = require('./commandModel')

    module.exports = commandHolderModel = CommandModel.extend({
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
            this.set("children", new CommandCollection());

            if (attrs && attrs.children) {
                this.setChildren(attrs.children);
            }
        }

    });

    commandHolderModel.prototype.setChildren = function(children) {
        this.get("children").reset(children).forEach(function(child) {
          child.parent = this;
        }, this);
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
