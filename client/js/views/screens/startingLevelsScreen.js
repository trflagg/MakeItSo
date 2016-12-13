
var dot = require('dot')
, Screen = require('./screen')
, template = require('../../../templates/screens/startingLevelsScreen.dot')

module.exports = startingLevelsScreen = Screen.extend({

  events: {
    'click .personalityDiv': 'personalityClicked'
  }

  , initialize: function() {
    Screen.prototype.initialize.apply(this);
    this.template = dot.template(template);

    this.personalities = [
      {
        id: 'ISTJ'
        , name: 'Inspector'
        , description: 'Logical, organized, sensible, reliable, stable, and consistent.'
      }
      , {
        id: 'ENTJ'
        , name: 'Fieldmarshall'
        , description: 'Decisive, forcefull, efficient, straightforward, dynamic, and self-sacrificing.'
      }
      , {
        id: 'INFP'
        , name: 'Mediator'
        , description: 'Introspective, cooperative, informative, sensitive, loyal, and attentive.'
      }
      , {
        id: 'ESFP'
        , name: 'Performer'
        , description: 'Live in the moment, observant, hands-on, active, generous, and optimistic.'
      }
    ]
    this.render();
  }

  , render: function() {
    $(this.el).html(this.template({
      name: this.model.get('profile').get('name')
      , personalities: this.personalities
    }));

    return this;
  }

  , personalityClicked: function(event) {
    var type_selected = event.currentTarget.dataset.personalityId;
    var url = this.model.get('ship').url() + "/starting_levels";
    var screen = this;
    $.ajax({
      url: url
      , method: 'POST'
      , data: {
        type_selected: type_selected
      }
    }).done(function() {
      screen.next();
    }).fail(function(jqXHR, textStatus) {
      screen.$("#errorMessage").html("Error occurred on server: "+textStatus);
    });
  }
});
