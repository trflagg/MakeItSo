    var Backbone = require('backbone')
    , _ = require('underscore')
    , dot = require('dot')
    , commandHolderView = require('./commandHolderView')
    , template = require('../../templates/directMessageCommandHolderView.dot')

    module.exports = directMessageCommandHolderView = commandHolderView.extend({
        initialize: function() {
            commandHolderView.prototype.initialize.apply(this);
            this.setTemplate(dot.template(template));

            if (this.model) {
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model.get("children"), 'run', this.runCommand);
            }
            this.render();
        },

      newMessages: function() {
        console.dir(this.model);
        return (this.model.get("children") >  0);
      },

      render: function() {
        commandHolderView.prototype.render.apply(this);

        if(this.newMessages()) {
          console.log('new');
          $(this.el).addClass('new');
        }

        return this;
      },

      clicked: function() {
        this.trigger('showDirectMessages');
      }

    });
