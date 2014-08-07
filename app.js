/**
 * app.js
 *
 * Loads middleware and controllers and starts the app.
 */

var fs = require('fs')
    , router = require('koa-router')
    , serve = require('koa-static')
    , session = require('koa-session')
    , koa = require('koa');

var app = module.exports = koa();


/**
 * Middleware
 */
app.use(serve('client'));
app.use(router(app));

app.keys = ['secret session cookie string'];
app.use(session());

/**
 * Load controllers in /controllers
 */
fs.readdirSync('./controllers').forEach(function (file) {
    require('./controllers/' + file)(app);
});


// Start!
if (!module.parent) app.listen(3000);

