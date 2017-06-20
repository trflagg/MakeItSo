/**
 * gameMode.js
 *
 * Mode for the user to select his ship.
 *
 */

import GameMode from '../../react/components/gameMode';
import { AppContainer } from 'react-hot-loader';

var Mode = require('./mode')
    , ReactDOM = require('react-dom')
    , React = require('react')

module.exports = Mode.extend({
  init: function() {
      this.listenTo(this.model.get('ship'), 'parse_done', this.shipChanged);

      if (module.hot) {
          module.hot.accept('../../react/components/gameMode/index', () => {
                const NewApp = require('../../react/components/gameMode/index').default;
                render(NewApp)
              });
      }
    }

    , render: function() {
        // render self
        this.renderReactComponent(GameMode);
        return this;
    }

    , shipChanged: function() {
        var ship = this.model.get('ship');
    }

    , renderReactComponent: function(Component) {
      ReactDOM.render(
        <AppContainer>
          <Component />
        </AppContainer>,
        document.getElementById('contents')
      );
    }
});


