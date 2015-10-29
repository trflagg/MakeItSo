
var render = require('../render');
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    // Don't allow edit in production
    if (app.env !== 'production') {

        app.get('/edit/api/messages', message_list);
        function *message_list() {
          var message_list = yield db.loadMultiple('Message', {}, {'name': 1});
          this.body = message_list;
        }

        app.get('/edit/(.*)', index);
        function *index() {
          this.body = yield render('edit_index.html');
        }

    }

}
