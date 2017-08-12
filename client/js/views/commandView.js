    var Backbone = require('backbone')
    , template = require('../../templates/commandView.dot')

    module.exports =  commandView = Backbone.View.extend({


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
            var level_too_low = this.level_too_low();

            $(this.el).html(this.template({
                text: this.model.get("text")
                , level: this.model.get("level")
                , level_too_low: level_too_low
                , cid: this.cid
            }));

            return this;
        }
    });

    commandView.prototype.clicked = function() {
        this.model.trigger('run', this.model);
    };

    commandView.prototype.level_too_low = function() {
        return (this.model.parent.has("level") &&
                (this.model.parent.get("level") < this.model.get("level")));
    }
