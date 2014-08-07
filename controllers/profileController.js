/**
 * profileController.js
 *
 * for accessing & modifying profile information
 */

var render = require('../render')
    , bodyParser = require('koa-body');

module.exports = function(app, db) {

    /**
     * PUT /profile
     *
     * make a new profile with sent data
     * @return {json}
     */
    app.put('/profile', bodyParser(), addProfile);
    function *addProfile(next) {
        var body = this.request.body;

        // make new profile
        var profile = db.create('Profile');
        profile.name = body.name;

        try {
            // save
            yield db.save('Profile', profile)

            // set cookie based on new profile id
            this.cookies.get('id');
            this.cookies.set('id', profile._id);

            // return id
            this.body = {
                id: profile._id
                , success: 'true'
            }
        }
        catch (e) {
            this.body = {
                success: 'false'
                , error: e.message
            }
        }

    }
}

