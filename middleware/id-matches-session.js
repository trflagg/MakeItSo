var ObjectID = require('mongodb').ObjectID

/**
 * checks that the id passed by the user matches session.profile
 *
 * options:
 *     source: where to get the id from.
 *          *'params': this.params.profile_id (from the URL)
 *          'body': this.request.body['profile_id'] (from form data)
 *
 *     load:
 *         *true: load the profile from the db into this.params.profile
 *         false: don't load, only check that they match
 */
module.exports = function(db, options) {
  options = options || {};
  options.source = options.source || 'params';
  options.load = options.load || true;

  return async function (req, res, next) {
    if (!req.session.profile) {
      res.status(400).send('session not found.');
    }

    switch(options.source) {
      case 'params':
        var profile_id = req.params.profile_id;
        break;
      case 'body':
        var profile_id = req.body['profile_id'];
        break;
      default:
        res.status(500).send('idMatchesSession(): bad options.source');
    }
    if (req.session.profile != profile_id) {
      res.status(400).send('session does not match param.');
    }

    // ensure it exists
    if (options.load) {
      var profile = await db.load('Profile'
        , {_id: new ObjectID(req.session.profile)});

      console.dir(profile);


      req.params.profile = profile;
    }

    next();
  }
}
