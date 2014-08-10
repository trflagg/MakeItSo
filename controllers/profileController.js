/**
 * profileController.js
 *
 * for accessing & modifying profile information
 */

var render = require('../render')
    , bodyParser = require('koa-body')
    , requiredParams = require('../middleware/require-params');

module.exports = function(app, db) {

    /**
     * PUT /profile
     *
     * make a new profile with sent data
     * @return {json}
     */
    app.put('/profile', bodyParser(), requiredParams(['name']), addProfile);
    function *addProfile() {
        var body = this.request.body;

        // make new profile
        var profile = db.create('Profile');
        profile.name = body.name;

        try {
            // save
            yield db.save('Profile', profile)

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

