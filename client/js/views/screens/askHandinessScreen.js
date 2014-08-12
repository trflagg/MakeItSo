/**
 * askHandinessScreen.js
 *
 * Right handed or left handed?
 *
 */

define(['./screen'
        , 'doT!/templates/askHandinessScreen'

], function(Screen
            , template
) {

    var askHandinessScreen = Screen.extend({
        events: {
        }

        /**
         * init()
         *
         * initialize this mode
         * @return {None}
         */
        , initialize: function() {
            Screen.prototype.initialize();

            this.template = template;
            this.render();
        }

        /**
         * activate()
         *
         * called when screen is shown to user
         * @return {None}
         */
        , activate: function() {
            Screen.prototype.activate();
        }

        /**
         * render()
         *
         * draw the screen
         * @return {html}
         */
        , render: function() {
            return $(this.el).html(this.template({
                name: this.model.get('name')
                , handiness: this.model.get('handiness')
            }));
        }

        , handinessClicked: function(handiness) {
            submit(handiness);
        }

        , submit: function(handiness) {
            $.ajax({
                url: '/profile'
                , type: 'PUT'
                , contentType: 'application/json'
                , data: JSON.stringify({
                    'handiness': handiness
                })
            }).fail(function(jqHXR, text) {
                $("#handinessError").html(text);
            }).done(function(data) {
                if (data.success) {
                    this.model.set('handiness');
                    nextScreen();
                } else {
                    $("#handinessError").html(text);
                }
            })
        }
    });

    return askHandinessScreen;
});
