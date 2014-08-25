var util = require('util');

module.exports = function(db) {

    var Model = require('argieDB/model')(db);

    Profile = function(doc) {
        Model.call(this, doc);
    }
    util.inherits(Profile, Model);

    Profile.prototype.initialize = function() {
        this.name = null;
        this.handiness = null;
    };

    Profile.prototype.saveToDoc = function(doc) {
        doc.name = this.name;
        doc.handiness = this.handiness;

        return doc;
    };

    Profile.prototype.loadFromDoc = function(doc) {
        this.name = doc.name;
        this.handiness = doc.handiness;
    };

    Profile.prototype.validate = function() {
        if (this.name) {
            if (this.name.length < 3)
                throw new Error(message='name must be at least 3 characters.');

            if (!/^[a-zA-Z]+$/.test(this.name))
                throw new Error(message='name may only contain uppercase and lowercase letters.');
        }

        if (this.handiness) {
            if (this.handiness !== 'right' &&
                this.handiness !== 'left') {
                throw new Error(message='handiness must be either right or left.');
            }
        }
    };

    db.register('Profile', Profile);

    return Profile;
}
