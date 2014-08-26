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
                                    , {profile_id: this.params.profile._id});
        this.body = {};
        this.body.ships = [];

        for (var i=0, ll=ships.length; i<ll; i++) {
            this.body.ships.push({
                shipName: ships[i].shipName
                , _id: ships[i]._id
            });
        }
    }
}
