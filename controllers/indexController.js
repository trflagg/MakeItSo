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
     * returns starting mode
     * @return {json}
     */
    app.get('/start', start);
    function *start() {

        try {
            var profile_id = this.cookies.get('profile');
            var mode = null;
            if (profile_id) {
                // has cookie. Load it and set session.
                try {
                    var profile = yield db.load('Profile', {_id: new ObjectID(profile_id)});
                    mode = 'selectShip';
                    this.session.profile = profile_id;
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
                // no cookie. Make new profile and set session.
                var profile = db.create('Profile');
                yield db.save('Profile', profile);
                this.session.profile = profile_id;

                this.cookies.get('profile');
                this.cookies.set('profile', profile._id);
                this.session.profile = profile._id;

                mode = 'newShip';
            }
            this.body = {
                mode: mode
            };

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
        this.cookies.set('id', null);
        this.body = "Cookie deleted";
    }
}
