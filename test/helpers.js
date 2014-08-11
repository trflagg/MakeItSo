var Db = require('argieDB/db')
    , environment = require('argieDB/environment-local')

module.exports = function() {
    helpers = {};

    helpers.getDb = function() {
        return new Db(environment);
    }

    return helpers;
}()