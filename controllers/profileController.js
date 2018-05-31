/**
 * profileController.js
 *
 * for accessing & modifying profile information
 */

var requireParams = require('../middleware/require-params')
  , idMatchesSession = require('../middleware/id-matches-session');

module.exports = function(app, db) {

  /**
   * GET /profile/:profile_id
   *
   * get details on a profile.
   *
   * @return { json } profile info.
   */
  app.get('/profile/:profile_id'
    , idMatchesSession(db)
    , getProfile);
  function getProfile(req, res) {
    // profile loaded into params by idMatchesSession
    res.json(req.params.profile);
  }

  /**
   * POST /profile/
   *
   * make new profile.
   * Requires 'name'
   *
   * @return { json }
   */
  app.post('/profile/'
    , requireParams(['name'])
    , newProfile);
  async function newProfile(req, res) {
    try {
      var profile = db.create('Profile');
      profile.name = req.body['name'];
      await db.save('Profile', profile);
      req.signedCookies.profile;
      var expires = new Date();
      res.cookie('profile', profile._id, {
        signed: true,
        expires: new Date(Date.now + 1000 * 60 * 60 * 24 * 365)
      });
      req.session.profile = profile._id;

      res.json({
        success: 'true'
        , id: profile._id
      });
    } catch(e) {
      res.json({
        success: 'false'
        , error: e.message
      });
    }
  }

  /**
   * PUT /profile/:profile_id
   *
   * modify profile with :profile_id
   *
   * @return { json }
   */
  app.put('/profile/:profile_id'
    , idMatchesSession(db)
    , editProfile);
  async function editProfile(req, res) {

    var body = req.body
      , profile = req.params.profile;

    try {
      if (body.name)
        profile.name = body.name;

      if (body.handiness)
        profile.handiness = body.handiness;

      if (body.sex)
        profile.sex = body.sex;

      await db.save('Profile', profile);

      res.json({
        success: 'true'
      });
    } catch(e) {
      res.json({
        success: 'false'
        , error: e.message
      });
    }
  }
}
