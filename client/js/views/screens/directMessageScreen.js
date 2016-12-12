
var Backbone = require('backbone')
, _ = require('underscore')
, dot = require('dot')
, template = require('../../../templates/screens/directMessageScreen.dot')

module.exports = directMessageScreen = Backbone.View.extend({

  events: {
    'click .directMessageLink': 'showMessage'
  }

  , initialize: function() {
    this.template = dot.template(template);
    this.render();
  }

  , render: function() {
    $(this.el).html(this.template({
      messages: this.model.get('ship').get('directMessages').get('children').toJSON()
    }));
  }

  , showMessage: function(event) {
    var messageText = event.target.text;
    this.model.get('ship').runCommand('direct_messages.' + messageText);
  }

});
