/**
 * profileController.js
 *
 * for accessing & modifying profile information
 */

var render = require('../render')
    , bodyParser = require('koa-body')
    , requireParams = require('../middleware/require-params')
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
    function getProfile() {
        // profile loaded into params by idMatchesSession
        this.body = this.params.profile;
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
             , bodyParser()
             , requireParams(['name'])
             , newProfile);
    async function newProfile() {
        try {
            var profile = db.create('Profile');
            profile.name = this.request.body['name'];
            await db.save('Profile', profile);
            this.cookies.get('profile');
            var expires = new Date();
            expires.setFullYear(expires.getFullYear() + 1);
            this.cookies.set('profile', profile._id, {signed: true, expires: expires});
            this.session.profile = profile._id;

            this.body = {
                success: 'true'
                , id: profile._id
            }
        } catch(e) {
            this.body = {
                success: 'false'
                , error: e.message
            }
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
            , bodyParser()
            , idMatchesSession(db)
            , editProfile);
    async function editProfile() {

        var body = this.request.body
            , profile = this.params.profile;

        try {
            if (body.name)
                profile.name = body.name;

            if (body.handiness)
                profile.handiness = body.handiness;

            if (body.sex)
                profile.sex = body.sex;

            await db.save('Profile', profile);

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
