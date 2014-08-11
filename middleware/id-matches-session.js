var ObjectID = require('mongodb').ObjectID

module.exports = function(db, exists) {
    exists = exists || true;

    return function *(next) {
        if (!this.session.profile) {
            this.throw(400, 'session not found.');
        } else if (this.session.profile != this.params.id) {
            this.throw(400, 'session does not match param.')
        }

        // ensure it exists
        if (exists) {
            var profile = yield db.load('Profile'
                            , {_id: new ObjectID(this.session.profile)});
            this.params.profile = profile;
        }

        yield* next;
    }
}
