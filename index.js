/**
 * Index.js
 *
 * Starts app.
 */

var router = require('koa-router');
var koa = require('koa');
var app = koa();


/**
 * Middleware
 */
app.use(router(app));

/**
 * Routes
 */
app.get('/', index);


// Start!
app.listen(3000);


function *index() {
	this.body = "Make It So";

	return;
}