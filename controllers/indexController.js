/**
 * indexController.js
 *
 * What happens when you first go to the site.
 */

var render = require('../render');
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    /**
     * index()
     *
     * send index.html.
     * @return {html}
     */
    app.get('/', index);
    function *index() {
        this.body = yield render('index.html');

    }

    /**
     * start()
     *
     * sets session and returns starting mode
     *
     * /start with no cookie:
     *   reply { mode: 'newProfile'}
     *
     * /start with cookie:
     *   look up profile in db with id in cookie
     *   if exists:
     *     set session
     *     reply { mode: 'selectShip', id: <profile id>}
     *   doesn't exist:
     *      reply { error: 'Cookie profile_id not found in db.'}

     * @return {json}
     */
    app.get('/start', start);
    function *start() {

        try {
            var profile_id = this.cookies.get('profile');
            var mode = null;
            // turn off cookie
            // if (false) {
            if (profile_id) {
                // has cookie. Load it and set session.
                try {
                    var profile = yield db.load('Profile', {_id: new ObjectID(profile_id)});
                    this.session.profile = profile_id;
                    this.body = {
                        mode: 'selectShip'
                        , id: profile_id
                    };
                }
                catch(e) {
                    // Don't send thrown error message since
                    // it contains db id and it would be best to shield that
                    // from user as much as possible
                    if (e.name === 'NotFoundError') {
                        throw new Error('Cookie profile_id not found in db.');
                    }
                    else {
                        throw e;
                    }
                }
            }
            else {
                // no cookie.
                this.body = {
                    mode: 'newProfile'
                };
            }

        } catch(e) {
            this.body = {
                error: e.message
            };
        }
    }

    /**
     * deleteCookie()
     *
     * resets the app cookie.
     * @return {String}
     */
    app.get('/delete-cookie', deleteCookie);
    function *deleteCookie() {
        this.cookies.set('profile', null);
        this.body = "Cookie deleted";
    }
}
