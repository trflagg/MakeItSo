var util = require('util');

module.exports = function(db) {

    var Model = require('argieDB/model')(db);

    Profile = function(doc) {
        Model.call(this, doc);
    }
    util.inherits(Profile, Model);

    Profile.prototype.initialize = function() {
        this._name = null;
    };

    Profile.prototype.saveToDoc = function(doc) {
        doc.name = this._name;

        return doc;
    };

    Profile.prototype.loadFromDoc = function(doc) {
        this._name = doc.name;
    };

    Object.defineProperty(Profile.prototype, "name",
    {
        get: function() {
            return this._name;
        }
        , set: function(name) {
            this._name = name;
        }
    });

    db.register('Profile', Profile);

    return Profile;
}