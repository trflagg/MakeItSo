/**
 * appView.js
 *
 * View that runs the application level.
 * Responsible for switching between modes.
 *
 */

define(['backbone'
        , '../models/appModel'
        , '../models/shipModel'
        , '../views/modes/editOptionsMode'
        , '../views/modes/SelectShipMode'
        , '../views/modes/gameMode'
        , '../views/modes/titleMode'

], function(Backbone
            , AppModel
            , ShipModel
            , EditOptionsMode
            , SelectShipMode
            , GameMode
            , TitleMode
) {

    var appView = Backbone.View.extend({

        /**
         * initialize()
         *
         * initialize the view
         * @return {None}
         */
        initialize: function() {
            this.model = new AppModel();
            this.listenTo(this.model, 'change:mode', this.updateMode);

            // start the app
            this.start();
        }

        /**
         * start()
         *
         * start the application
         * @return {None}
         */
        , start: function() {

            // start the app by having the model get the starting mode
            this.model.setStartMode();
        }

        /**
         * updateMode()
         *
         * fired when the mode changes
         * @return {None}
         */
        , updateMode: function() {
            var appView = this
                , appModel = this.model;

            // TODO: Swap out views correctly to avoid memory leaks
            switch(this.model.get('mode')) {
                case 'title':
                    this.setMode(new TitleMode({
                            el: $("<div></div>")
                            , model: appModel
                    }));
                    this.mode.render();
                    break;

                case 'newProfile':
                    // fade out old mode.
                    $('#contents').fadeOut('slow', function() {
                        appView.setMode(new EditOptionsMode({
                            el: $("<div></div>")
                            , model: appModel
                        }));

                        appView.mode.newProfile();

                        $("#contents").fadeIn('slow');
                    });
                    break;

                case 'newShip':
                    $("#contents").fadeOut('slow', function() {

                        appModel.set('ship', new ShipModel());

                        appView.setMode(new EditOptionsMode({
                            el: $("<div></div>")
                            , model: appModel
                        }));

                        appView.mode.newShip();

                        $("#contents").fadeIn('slow');
                    });
                    break;

                case 'selectShip':
                    appModel.loadProfile();
                    appModel.getShipList();

                    $("#contents").fadeOut('slow', function() {
                        appView.setMode(new SelectShipMode({
                            el: $("<div></div>")
                            , model: appModel
                        }));

                        appView.mode.render();

                        $("#contents").fadeIn('slow');
                    });
                    break;

                case 'startGame':
                    // fetch ship from server
                    appModel.get('ship').fetch();

                    $("#contents").fadeOut('slow', function() {
                        appView.setMode(new GameMode({
                            el: $("<div></div>")
                            , model: appModel
                        }));

                        appView.mode.render();

                        $("#contents").fadeIn('slow');
                    });
                    break;
            }
        }

        , setMode: function(newMode) {
            if (this.mode) {
                this.mode.close();
            }
            else {
                $("#contents").empty();
            }

            this.mode = newMode;
            $("#contents").append(newMode.$el);
        }

    })

    return appView;
})
