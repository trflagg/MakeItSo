/**
 * profileController.js
 *
 * for accessing & modifying profile information
 */

var render = require('../render')
    , bodyParser = require('koa-body')
    , idMatchesSession = require('../middleware/id-matches-session');

module.exports = function(app, db) {
    /**
     * POST /profile/:id
     *
     * modify profile with :id
     *
     * @return { json }
     */
    app.post('/profile/:id'
            , bodyParser()
            , idMatchesSession(db)
            , editProfile);
    function *editProfile() {

        var body = this.request.body
            , profile = this.params.profile;

        try {
            if (body.name)
                profile.name = body.name;

            if (body.handiness)
                profile.handiness = body.handiness;

            yield db.save('Profile', profile);

            this.body = {
                success: 'true'
            }
        } catch(e) {
            this.body = {
                error: e.message
            };
        }
    }
}
