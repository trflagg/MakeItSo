/**
 * app.js
 *
 * Loads middleware and controllers and starts the app.
 */

var fs = require('fs')

  , Db = require('argieDB/db')

  , regExs = require('./helpers/regExs')

  , morgan = require('morgan')
  , express = require('express')
  , session = require('express-session')
  , MongoDBStore = require('connect-mongodb-session')(session)
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')

  , webpack = require('webpack')
  , webpackDevMiddleware = require('webpack-dev-middleware')
  , config = require('./webpack.dev.js');

require('express-async-errors');

var app = module.exports = express();

/**
 * Create db connection
 */
console.log('Connecting to DB');

environment = require('./db-environment-default.js');

if (process.env.DB_ENV === 'compose') {
  environment = require('./db-environment-compose.js');
}

// hide the username:password in the URL string
var hiddenDBString = environment.db.URL.replace(/:\/\/.*:(.*)@/, 'XXXXXXX');
console.log('db URL: '+ hiddenDBString);
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
if (process.env.NODE_ENV === "production") {
  app.use(morgan('short'));
} else {
  app.use(morgan('dev'));
}

app.use(express.static('client'));

var sessionStore = new MongoDBStore({
  uri: environment.db.URL,
  databaseName: 'express_session',
  collection: 'sessions',
});
sessionStore.on('error', function(error) {
  console.error('error from MongoDBStore');
  console.error(error);
});
app.use(session({
  secret: hiddenDBString,
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(cookieParser(hiddenDBString));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

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
