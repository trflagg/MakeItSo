define([
    'backbone'
    , 'views/commandView'
    , 'doT!/templates/commandHolderView'
], function(Backbone, commandView, template) {

    var commandHolderView = Backbone.View.extend({

        events: function() {
            events = {};

            events["click #"+this.cid+"-item"] = "clicked";

            return events
        },

        initialize: function() {
            this.setTemplate(template);

            if (this.model) {
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model.get("children"), 'run', this.runCommand);
            }
            this.render();
        },

        render: function() {
            if (this.model) {
                $(this.el).html(this.template({
                    text: this.model.get("text")
                    , childMessageCount: this.model.get("childMessageCount")
                    , cid: this.cid
                }));

                if (this.model.get("childMessageCount") === 0) {
                    this.$('p').addClass('disabled');
                }

                var children = this.model.get("children").models;
                if (this.model.get("show_children")) {
                  _.each(children, this.renderChild, {parent: this});
                }
            }

            return this;
        }
    });

    commandHolderView.prototype.setTemplate = function(givenTemplate) {
        this.template = givenTemplate;
    };

    commandHolderView.prototype.renderChild = function(child) {
        if (child.get("children")) {
            this.parent.renderChildCommandHolder(child);
        }
        else {
            this.parent.renderCommand(child);
        }
    };

    commandHolderView.prototype.renderChildCommandHolder = function(commandHolder) {
        this.$('#'+this.cid+'-children').append(
            new commandHolderView({
                tagName: 'li',
                model: commandHolder
            })
        .el);
        this.listenTo(commandHolder.get('children'), 'run', this.runCommand);
    };

    commandHolderView.prototype.renderCommand = function(command) {
        this.$('#'+this.cid+'-children').append(
            new commandView({
                tagName: 'li',
                model: command
            })
        .el);
    };

    commandHolderView.prototype.runCommand = function(command) {
        // bubble up the event
        this.trigger('run', command);
    };

    commandHolderView.prototype.clicked = function() {
        this.model.toggleChildren();
    };

    return commandHolderView;
});
