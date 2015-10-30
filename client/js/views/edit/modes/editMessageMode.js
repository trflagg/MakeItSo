
define(['../../modes/mode'
        , 'doT!/templates/edit/editMessageMode'

], function(Mode
            , template
) {

    var editMessageMode = Mode.extend({

        events: {
            'click #saveButton': 'saveMessage'
            , 'click #listButton': 'backToMessageList'
        }

        , init: function(options) {
            this.message_name = options.message_name;
            this.template = template;
            var message = Backbone.Model.extend({
                url: '/edit/api/message/' + this.message_name
            });
            this.message = new message();
            var mode = this;
            this.message.fetch({
                success: function() {
                    mode.render();
                }
            });
        }

        , render: function() {
            console.dir(this.message);
            $(this.el).html(this.template({
                message: this.message
            }));
            var textArea = $("#editTextarea").append(this.message.escape('_text'));
            $("#editMessage").height($(document).height() - 20);
            $("#editMessage").width($(document).width() - 20);

            return this;
        }

        , saveMessage: function() {
            this.message.set('_text', $('#editTextarea')[0].value)
            console.log(this.message.get('_text'));
            this.message.save();
        }

        , backToMessageList: function() {
          Backbone.history.navigate("messages", {trigger: true});
        }

    });

    return editMessageMode;
});
