var fs = require('fs')
    , Db = require('argieDB/db')
    , coDb = require('argieDB/co-db')
    , environment = require('argieDB/environment-local')

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

    return helpers;
}()
