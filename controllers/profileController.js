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
     * PUT /profile/:id
     *
     * modify profile with :id
     *
     * @return { json }
     */
    app.put('/profile/:id'
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

            if (body.sex)
                profile.sex = body.sex;

            yield db.save('Profile', profile);

            this.body = {
                success: 'true'
            }
        } catch(e) {
            this.body = {
                success: 'false'
                , error: e.message
            };
        }
    }
}
