/**
 * app.js
 *
 * Starts app.
 */

var fs = require('fs');
var router = require('koa-router');
var koa = require('koa');
var app = koa();


/**
 * Middleware
 */
app.use(router(app));


/**
 * Load controllers in /controllers
 */
fs.readdirSync('./controllers').forEach(function (file) {
	require('./controllers/' + file).init(app);
});


// Start!
app.listen(3000);

