var util = require('util');

module.exports = function(db) {

    var Model = require('argieDB/model')(db);

    Profile = function(doc) {
        Model.call(this, doc);
    }
    util.inherits(Profile, Model);

    Profile.prototype.initialize = function() {
        this._name = null;
        this._handiness = null;
    };

    Profile.prototype.saveToDoc = function(doc) {
        doc.name = this._name;
        doc.handiness = this._handiness;

        return doc;
    };

    Profile.prototype.loadFromDoc = function(doc) {
        this._name = doc.name;
        this._handiness = doc.handiness;
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

    Object.defineProperty(Profile.prototype, "handiness",
    {
        get: function() {
            return this._handiness;
        }
        , set: function(handiness) {
            this._handiness = handiness;
        }
    });

    db.register('Profile', Profile);

    return Profile;
}