
define(['../../modes/mode'
        , 'doT!/templates/edit/listMessagesMode'

], function(Mode
            , template
) {

    var listMessagesMode = Mode.extend({
        events: {
        }

        , init: function() {
            this.template = template;
            var messageCollection = Backbone.Collection.extend({
                url: 'api/messages'
            });
            this.messages = new messageCollection();
            var mode = this;
            this.messages.fetch({
                success: function() {
                    mode.render();
                }
            });
        }

        , render: function() {
            $(this.el).html(this.template({
                messages: this.messages.map(function(message) {
                    return message.get('_name');
                })
            }));

            console.log('render');
            return this;
        }

    });

    return listMessagesMode;
});
