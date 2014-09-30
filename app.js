/**
 * app.js
 *
 * Loads middleware and controllers and starts the app.
 */

var fs = require('fs')

    , Db = require('argieDB/co-db')
    , environment = require('argieDB/environment-local')

    , regExs = require('./helpers/regExs')

    , logger = require('koa-logger')
    , router = require('koa-router')
    , serve = require('koa-static')
    , session = require('koa-session')

    , koa = require('koa');

var app = module.exports = koa();

/**
 * Create db connection
 */
var db = new Db(environment);

/**
 * Register argie's regExs
 */
regExs.registerRegExs();

/**
 * load models in /models
 */
fs.readdirSync('./models').forEach(function(file) {
    require('./models/' + file)(db);
})

/**
 * Middleware
 */
app.use(logger());
app.keys = ['secret session cookie string'];
app.use(session());
app.use(serve('client'));
app.use(router(app));

/**
 * Load controllers in /controllers
 */
fs.readdirSync('./controllers').forEach(function (file) {
    require('./controllers/' + file)(app, db);
});


// Start!
if (!module.parent) app.listen(3000);

