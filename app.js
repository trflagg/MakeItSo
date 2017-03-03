/**
 * app.js
 *
 * Loads middleware and controllers and starts the app.
 */

var fs = require('fs')

    , Db = require('argieDB/co-db')

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
console.log('Connecting to DB');

environment = require('./db-environment-default.js');

if (process.env.DB_ENV === 'compose') {
  environment = require('./db-environment-compose.js');
}

// hide the username:password in the URL string
console.log('db URL: '+environment.db.URL.replace(/:\/\/.*:(.*)@/, 'XXXXXXX'));
var db = new Db(environment);
console.log('Connected.');

/**
 * Register argie's regExs
 */
regExs.registerRegExs();

/**
 * load models in /models
 */
fs.readdirSync('./models').forEach(function(file) {
  if (!file.startsWith('.')) {
    require('./models/' + file)(db);
  }
})

/**
 * Middleware
 */
app.use(logger());
app.keys = ['secret session cookie string'];
app.use(session(app));
app.use(serve('client'));
app.use(router(app));

/**
 * Load controllers in /controllers
 */
fs.readdirSync('./controllers').forEach(function (file) {
    require('./controllers/' + file)(app, db);
});


// Start!
var port = 3000
if (process.env.NODE_ENV === "production") {
    port = 80;
}
if (!module.parent) app.listen(port);
