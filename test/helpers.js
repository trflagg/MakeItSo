var fs = require('fs')
    , thunkify = require('thunkify')
    , Db = require('argieDB/db')
    , coDb = require('argieDB/co-db')
    , environment = require('../environment-test')

module.exports = function() {
    helpers = {};

    helpers.getDb = function() {
        return new Db(environment);
    }

    helpers.getCoDb = function() {
        return new coDb(environment);
    }

    helpers.loadModels = function(db) {
        fs.readdirSync('./models').forEach(function(file) {
            require('../models/' + file)(db);
        });
    }

    helpers.createSession = function(agent, callback) {
        agent
        .post('http://localhost:3000/profile/')
        .send({name: 'test'})
        .end(function(err, result) {
            callback(err, result);
        });
    };

    helpers.coCreateSession = thunkify(helpers.createSession);

    return helpers;
}()
