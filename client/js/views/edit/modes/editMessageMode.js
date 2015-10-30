
define(['../../modes/mode'
        , 'doT!/templates/edit/editMessageMode'

], function(Mode
            , template
) {

    var editMessageMode = Mode.extend({

        init: function(options) {
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
            var textArea = $("#editTextarea").append(this.message.get('_text'));
            textArea.height($(window).height() - 10);
            textArea.width($(window).width() - 10);
            this.$("#editMessage").append(textArea);

            return this;
        }

    });

    return editMessageMode;
});
