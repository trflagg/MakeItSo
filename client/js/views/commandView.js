define([
    'backbone',
    'doT!/templates/commandView'
], function(Backbone, template) {

    var commandView = Backbone.View.extend({


        events: function() {
            events = {};

            events["click #"+this.cid+"-item"] = "clicked";

            return events
        },

        initialize: function() {
            this.template = template;

            if (this.model) {
                this.listenTo(this.model, 'change', this.render);
            }
            this.render();
        },

        render: function() {
            $(this.el).html(this.template({
                text: this.model.get("text")
                , cid: this.cid
            }));

            return this;
        }
    });

    commandView.prototype.clicked = function() {
        this.model.trigger('run', this.model.get('text'));
    };

    return commandView;
});