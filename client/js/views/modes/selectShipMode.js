    /**
    * selectShipMode.js
    *
    * Mode for the user to select his ship.
    *
    */

    var Mode = require('./mode')
    , $ = require('jquery')
    , ShipModel = require('../../models/shipModel')
    , template = require('../../../templates/modes/selectShipMode.dot')

    module.exports = selectShipMode = Mode.extend({
        events: {
            'click #newShipLink': 'newShip'
            , 'click .shipLink': 'shipSelected'
        }

        /**
            * init()
            *
            * initialize this mode
            * @return {None}
            */
        , init: function() {
            this.template = template;
        }

        , render: function() {
            $(this.el).html(this.template({
                name: this.model.get('profile').get('name')
                , ships: this.model.get('ships')
            }));

            return this;
        }

        , newShip: function() {
            this.model.set('mode', 'newShip');
        }

        , shipSelected: function(event) {
            var shipIndex = event.target.dataset.shipIndex;
            var selectedShip = new ShipModel({
                profile_id: this.model.get('profile').id
            });
            selectedShip.set('id', this.model.get('ships')[shipIndex]._id)
            this.model.set('ship', selectedShip);
            this.model.set('mode', 'startGame');
        }

    });
