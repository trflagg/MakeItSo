
var render = require('../render')
    , requireParams = require('../middleware/require-params')
    , bodyParser = require('koa-body')
    , ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    // Don't allow edit in production
    if (app.env !== 'production') {

        app.get('/edit/api/messages', message_list);
        function *message_list() {
          var message_list = yield db.loadMultiple('Message', {}, {'name': 1});
          this.body = message_list;
        }

        app.get('/edit/api/message/:message_name', edit_message);
        function *edit_message() {
          var message_name = this.params.message_name;
          var message = yield db.load('Message', {'name': message_name});
          console.dir(message);
          this.body = message;
        }

        app.post('/edit/api/message/:message_name'
                , bodyParser()
                , requireParams(['_name'
                                ,'_text'])
                , save_message);
        function *save_message() {
          try {
            console.log(this.params);
            console.log(this.request.body);
            var message = yield db.load('Message', {'name': this.request.body._name});
            message.setText(this.request.body._text);
            yield db.save('Message', message);
            this.body = 'success';
          } catch(e) {
            throw e;
          }
        }

        app.get('/edit/(.*)', index);
        function *index() {
          this.body = yield render('edit_index.html');
        }

    }

}
