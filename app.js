/**
 * app.js
 *
 * Loads middleware and controllers and starts the app.
 */

var fs = require('fs')

    , Db = require('argieDB/co-db')
    , environment = require('argieDB/environment-local')

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
 * load models in /models
 */
fs.readdirSync('./models').forEach(function(file) {
    require('./models/' + file)(db);
})

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
    require('./controllers/' + file)(app, db);
});


// Start!
if (!module.parent) app.listen(3000);

