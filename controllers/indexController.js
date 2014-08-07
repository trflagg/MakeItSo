/**
 * indexController.js
 *
 * What happens when you first go to the site.
 */

var render = require('../render');


exports.init = function(app) {
    app.get('/', index);
    app.get('/start', start);
}

/**
 * index()
 *
 * send index.html.
 * @return {html}
 */
function *index() {
    this.body = yield render('index.html', {
        controller: 'index',
        ship: {
            id: 5
        }
    });

}

/**
 * start()
 *
 * returns starting mode
 * @return {json}
 */
function *start() {
    this.body = {
        mode: 'newShip'
    }
}