
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
        }

        , render: function() {
            $(this.el).html(this.template());
            return this;
        }

    });

    return listMessagesMode;
});
