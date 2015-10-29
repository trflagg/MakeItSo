
define(['../../modes/mode'
        , 'doT!/templates/edit/listMessagesMode'

], function(Mode
            , template
) {

    var listMessagesMode = Mode.extend({
        events: {
            'change #messageSelect': 'messageSelected'
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

            return this;
        }

        , messageSelected: function(event) {
            console.log(event.target.value);
        }

    });

    return listMessagesMode;
});
