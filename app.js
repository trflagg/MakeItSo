/**
 * app.js
 *
 * Starts app.
 */

var fs = require('fs')
	, router = require('koa-router')
	, serve = require('koa-static')
	, koa = require('koa');

var app = koa();


/**
 * Middleware
 */
app.use(serve('client'));
app.use(router(app));

/**
 * Load controllers in /controllers
 */
fs.readdirSync('./controllers').forEach(function (file) {
	require('./controllers/' + file).init(app);
});


// Start!
app.listen(3000);

