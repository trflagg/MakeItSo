/**
 * ShipNameScreen.js
 *
 * name your ship.
 */

var Screen = require('./screen')
  , template = require('../../../templates/screens/shipCrewScreen.dot')

module.exports =  shipNameScreen = Screen.extend({
  events: {
    'keydown .crewInput': 'keyDown',
    'click #startGameButton': 'submit',
    'click .genderButton': 'genderButtonClicked',
  }

  /**
   * init()
   *
   * initialize this mode
   * @return {None}
   */
  , initialize: function() {
    Screen.prototype.initialize.apply(this);
    this.template = template;
    this.render();

  }

  /**
   * activate()
   *
   * called when screen is shown to user
   * @return {None}
   */
  , activate: function() {

    // set default names and genders
    var crew = this.model.get('ship').get('crew').get('children').models;
    for (var i=0; i<crew.length; i++) {
      var crew_member = crew[i];
      $('#'+crew_member.get('id')).attr('placeholder', crew_member.get('name'));
      var $button = this.crewGenderButton(crew_member.get('id'), crew_member.get('data').gender);
      $button.addClass('selected');
    }

    Screen.prototype.activate();

    // fires too soon
    // this.$(".crewInput")[0].focus();
  }

  /**
   * render()
   *
   * draw the view
   * @return {html}
   */
  , render: function() {
    var shipName = this.model.get('ship') ?
      this.model.get('ship').get('shipName') :
      ''
    $(this.el).html(this.template({
      name: this.model.get('profile').get('name')
    }));


    return this;
  }

  /**
   *  keyDown()
   *
   * keyDown handler for text input
   * @param  {event} event keydown event
   * @return {Boolean} if the event should bubble down to subclass
   */
  , keyDown: function(event) {

  }

  , crewGenderButton: function(crew, gender) {
    return $('[data-crew='+crew+'][data-gender='+gender+']');
  }

  , genderButtonClicked: function(event) {
    var $target = $(event.target);
    var gender = $target.data('gender');
    var crew = $target.data('crew');

    var nextGender = 'male';
    if (gender === 'male') {
      nextGender = 'female';
    }

    var $nextGender = this.crewGenderButton(crew, nextGender).removeClass('selected');
    $target.addClass('selected');
  }

  /**
   * submit()
   *
   * submit data to server and deal with response
   * @return {None}
   */
  , submit: function() {
    var screen = this;

    var crew = [
      'security',
      'medical',
      'info',
      'empat',
      'engineering',
      'cultural',
      'janitor'
    ];

    var security = $("#security").val()
      , medical = $("#medical").val()
      , info = $("#info").val()
      , empat = $("#empat").val()
      , engineering = $("#engineering").val()
      , cultural = $("#cultural").val()
      , janitor = $("#janitor").val();

    var security_gender =
      this.crewGenderButton('security', 'male').hasClass('selected') ?
      'male' : 'female';
    var medical_gender =
      this.crewGenderButton('medical', 'male').hasClass('selected') ?
      'male' : 'female';
    var info_gender =
      this.crewGenderButton('info', 'male').hasClass('selected') ?
      'male' : 'female';
    var empat_gender =
      this.crewGenderButton('empat', 'male').hasClass('selected') ?
      'male' : 'female';
    var engineering_gender =
      this.crewGenderButton('engineering', 'male').hasClass('selected') ?
      'male' : 'female';
    var cultural_gender =
      this.crewGenderButton('cultural', 'male').hasClass('selected') ?
      'male' : 'female';
    var janitor_gender =
      this.crewGenderButton('janitor', 'male').hasClass('selected') ?
      'male' : 'female';


    this.reset();
    this.model.get('ship').get('crew').getChildById('security')
      .set('name', security).set('gender', security_gender);
    this.model.get('ship').get('crew').getChildById('medical')
      .set('name', medical).set('gender', medical_gender);
    this.model.get('ship').get('crew').getChildById('info')
      .set('name', info).set('gender', info_gender);
    this.model.get('ship').get('crew').getChildById('empat')
      .set('name', empat).set('gender', empat_gender);
    this.model.get('ship').get('crew').getChildById('engineering')
      .set('name', engineering).set('gender', engineering_gender);
    this.model.get('ship').get('crew').getChildById('cultural')
      .set('name', cultural).set('gender', cultural_gender);
    this.model.get('ship').get('crew').getChildById('janitor')
      .set('name', cultural).set('gender', janitor_gender);

    this.model.get('ship').save({
    }
      , {
        success: function(model, response, options) {
          if (response.error) {
            screen.showError(response.error);
          } else {
            screen.next();
          }
        }
        , error: function(model, response, options) {
          screen.showError(response.responseText)
        }
      });
  }

  /**
   * call before each submission to reset error message
   * @return {None}
   */
  , reset: function() {
    $("#nameError").html("");
  }

  /**
   * showError()
   *
   * display error on screen
   * @param  {String} message string to display
   * @return {None}
   */
  , showError: function(message) {
    this.$("#nameError").html(message);
  }
});
