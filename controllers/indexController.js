/**
 * indexController.js
 *
 * What happens when you first go to the site.
 */

var render = require('../render');

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

        var id = this.cookies.get('id');
        var mode = null;

        if (id) {
            mode = 'selectShip';
        }
        else {
            mode = 'newShip';
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
    app.get('/delete-cookie', deleteCookie);
    function *deleteCookie() {
        this.cookies.set('id', null);
        this.body = "Cookie deleted";
    }
}
