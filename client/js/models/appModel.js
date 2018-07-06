/**
 * appModel.js
 *
 * Model used by appView.
 *
 */

var Backbone = require('backbone')
  , $ = require('jquery')
  , ProfileModel = require('../models/profileModel');


module.exports = appModel = Backbone.Model.extend({

  // properties
  defaults: {
    mode: 'test'
    , profile: null
  },

  /**
   * initialize()
   *
   * initialize the model
   * @return {None}
   */
  initialize: function() {
  }

  /**
   * setStartMode()
   *
   * calls the server to find out what mode to start in.
   * @return {None}
   */
  , setStartMode: function() {
    appModel = this;

    $.ajax({
      type: 'GET'
      , url: '/start'

    }).done(function(data) {
      // id is undefined if this is a new profile.
      var newProfile = new ProfileModel({
        'id': data.id
      });
      appModel.set('profile', newProfile);
      appModel.set('mode', data.mode);
    })
  }

  , loadProfile: function() {
    appModel = this;

    this.get('profile').fetch();
  }

  /**
   * getShipList()
   *
   * calls the server to get the list of the user's ships
   * @return {None}
   */
  , getShipList: function() {
    appModel = this;

    $.ajax({
      type: 'GET'
      , url: '/ships/'+this.get('profile').get('id')
    }).done(function(data) {
      appModel.set('ships', data.ships);
    });
  }

});
