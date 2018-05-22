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
  async function index() {
    var scriptPath = 'build/js/main.min.js';
    if (process.env.NODE_ENV !== "production") {
      // webpack-dev-server inside docker-compose
      scriptPath = "http://192.168.99.100:8080/main.min.js";
    }
    this.body = await render('index.html',
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
  async function start() {

    try {
      var profile_id = this.cookies.get('profile');
      var mode = null;
      // turn off cookie
      // if (false) {
      if (profile_id) {
        // has cookie. Load it and set session.
        try {
          var profile = await db.load('Profile', {_id: new ObjectID(profile_id)});
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
            this.cookies.set('profile', null);
            this.body = {
              mode: 'title'
            };
            //throw new Error('Cookie profile_id not found in db.');
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
  function deleteCookie() {
    this.cookies.set('profile', null);
    this.body = "Cookie deleted";
  }

  app.get('/reset/:message_name', resetShip);
  async function *resetShip() {
    var messageName = this.params.message_name || '';
    var profile_id = this.cookies.get('profile');
    var ships = await db.loadMultiple('Ship'
      , {profile_id: new ObjectID(profile_id)});
    this.body = 'profile_id:'+profile_id;
    var importantGlobals;

    for (var i=0, ll=ships.length; i<ll; i++) {
      await db.remove('Decision', {'ship._id': new ObjectID(ships[i]._id.toString())});
      importantGlobals = ships[i].getImportantGlobals();
      ships[i].lastResult = await ships[i].reset(messageName);
      ships[i].setImportantGlobals(importantGlobals);
      await db.save('Ship', ships[i]);
      var newDecision = db.create('Decision');
      await newDecision.fromShipCommandAndChild(ships[i], messageName, 'reset');
      this.body += ' ship: '+ships[i]._id;
    }
  }

  app.get('/game-mode', gameMode);
  async function gameMode() {
    var profile_id = this.cookies.get('profile');
    if (!profile_id) {
      this.body = 'profile_id not found';
      return;
    }
    var profile = await db.load('Profile', {_id: new ObjectID(profile_id)});
    var ships = await db.loadMultiple('Ship'
      , {profile_id: new ObjectID(profile_id)});
    var shipData = null;
    if (ships[0]) {
      shipData = JSON.stringify(ships[0]);
    }
    this.body = await render('gameMode.html', {
      shipData: shipData,
      profile: JSON.stringify(profile),
      scriptPath: "http://192.168.99.100:8080/gameMode.min.js",
    });
  }

  app.get('/default-ship', defaultShip);
  async function defaultShip() {
    var profile_id = this.cookies.get('profile');
    if (!profile_id) {
      this.body = 'profile_id not found';
      return;
    }
    var profile = await db.load('Profile', {_id: new ObjectID(profile_id)});
    var ships = await db.loadMultiple('Ship'
      , {profile_id: new ObjectID(profile_id)});

    if (!ships[0]) {
      this.body = 'default ship not found';
    }
    ship = ships[0];
    this.body = ship.toClient();
    this.body.profile_id = profile_id;
  }
}

