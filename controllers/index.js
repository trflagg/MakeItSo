/**
 * index.js
 *
 * What happens when you first go to the site.
 */

exports.init = function(app) {
	app.get('/', index);
}

/**
 * index
 *
 * Show a welcome message.
 */
function *index() {
	this.body = "Make It So";

	return;
}