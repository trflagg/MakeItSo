    var Backbone = require('backbone')
    , dot = require('dot')
    , template = require('../../templates/commandView.dot')

    module.exports =  commandView = Backbone.View.extend({


        events: function() {
            events = {};

            events["click #"+this.cid+"-item"] = "clicked";

            return events
        },

        initialize: function() {
            this.template = dot.template(template);

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
        this.model.trigger('run', this.model);
    };
