/**
 * index.js
 *
 * What happens when you first go to the site.
 */

var render = require('../render');


exports.init = function(app) {
	app.get('/', index);
}

/**
 * index
 *
 * Show a welcome message.
 */
function *index() {
	this.body = yield render('index.html', {
		controller: 'index',
		ship: {
			id: 5
		}
	});

}