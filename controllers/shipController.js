/**
 * shipController.js
 *
 * For handling ship and shipList stuff
 */

var render = require('../render')
    , idMatchesSession = require('../middleware/id-matches-session');

module.exports = function(app, db) {
    /**
     * getShipList()
     *
     * return list of the user's ships
     * @return {json}
     */
    app.get('/ships/:id'
            , idMatchesSession(db)
            , getShipList);
    function *getShipList() {

        var ships = yield db.loadMultiple('Ship'
                    , {profile_id: this.params.profile._id}
                    , {shipName: 1, _id: 1});
        this.body = {
            ships: ships
        };
    }
}
