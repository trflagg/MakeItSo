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

  return function *(next) {
    if (!this.session.profile) {
      this.throw(400, 'session not found.');
    }

    switch(options.source) {
      case 'params':
        var profile_id = this.params.profile_id;
        break;
      case 'body':
        var profile_id = this.request.body['profile_id'];
        break;
      default:
        this.throw(500, 'idMatchesSession(): bad options.source');
    }
    if (this.session.profile != profile_id) {
      this.throw(400, 'session does not match param.')
    }

    // ensure it exists
    if (options.load) {
      var profile = yield db.load('Profile'
        , {_id: new ObjectID(this.session.profile)});

      console.dir(profile);


      this.params.profile = profile;
    }

    yield* next;
  }
}
