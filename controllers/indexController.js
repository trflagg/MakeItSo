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
        var scriptPath = 'client/js/build/main.min.js';
        if (process.env.NODE_ENV !== "production") {
          // webpack-dev-server inside docker-compose
          scriptPath = "http://192.168.99.100:8080/main.min.js";
        }
        this.body = yield render('index.html',
                                 { production: process.env.NODE_ENV === "production",
                                   scriptPath: scriptPath
                                 });

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
                    mode: 'title'
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

    app.get('/reset/:message_name', resetShip);
    function *resetShip() {
        var messageName = this.params.message_name || '';
        var profile_id = this.cookies.get('profile');
        var ships = yield db.loadMultiple('Ship'
                                , {profile_id: new ObjectID(profile_id)});
        this.body = 'profile_id:'+profile_id;

        for (var i=0, ll=ships.length; i<ll; i++) {
            ships[i].lastResult = yield ships[i].reset(messageName);
            yield db.save('Ship', ships[i]);
            this.body += ' ship: '+ships[i]._id;
        }
    }

    app.get('/game-mode', gameMode);
    function *gameMode() {
        var profile_id = this.cookies.get('profile');
        var ships = yield db.loadMultiple('Ship'
                                , {profile_id: new ObjectID(profile_id)});
        var shipData = null;
        if (ships[0]) {
          shipData = JSON.stringify(ships[0]);
        }
        this.body = yield render('gameMode.html', {
          shipData: shipData,
          scriptPath: "http://192.168.99.100:8080/gameMode.min.js",
        });
    }
}

