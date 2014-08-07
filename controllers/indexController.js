/**
 * indexController.js
 *
 * What happens when you first go to the site.
 */

var render = require('../render');


exports.init = function(app) {
    app.get('/', index);
    app.get('/start', start);
    app.get('/delete-cookie', deleteCookie);
}

/**
 * index()
 *
 * send index.html.
 * @return {html}
 */
function *index() {
    this.body = yield render('index.html');

}

/**
 * start()
 *
 * returns starting mode
 * @return {json}
 */
function *start() {

    var id = this.cookies.get('id');
    var mode = null;

    if (id) {
        mode = 'selectShip';
    }
    else {
        mode = 'newShip';
        this.cookies.set('id', 'something');
    }

    this.body = {
        'mode': mode
    };
}

/**
 * deleteCookie()
 *
 * resets the app cookie.
 * @return {String}
 */
function *deleteCookie() {
    this.cookies.set('id', null);
    this.body = "Cookie deleted";
}
