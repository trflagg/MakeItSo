    var Backbone = require('backbone')
    , _ = require('lodash')
    , template = require('../../templates/directMessagesButton.dot')

    module.exports = directMessagesButton = Backbone.View.extend({
      events: {
        "click": 'clicked'
      }
      , initialize: function() {
          this.template = template;

          if (this.model) {
              this.listenTo(this.model, 'change', this.render);
          }
          this.render();
      }

      , newMessages: function() {
        return (this.model.get("children").length >  0);
      }

      , render: function() {
        if (this.model) {
          $(this.el).html(this.template({
            text: this.model.get("text")
            , cid: this.cid
          }));

          if(this.newMessages()) {
            $(this.el).addClass('new');
          }
        }

        return this;
      }

      , clicked: function() {
        this.trigger('toggleDirectMessages');
      }

    });
