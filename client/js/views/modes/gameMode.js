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

      // hot reloading
      if (module.hot) {
          module.hot.accept('../../react/components/gameMode/index', () => {
                const NewApp = require('../../react/components/gameMode/index').default;
                render(NewApp)
              });
      }
    }

    , render: function() {
      ReactDOM.render(<GameMode
            ship={this.model.get('ship')}
            profile={this.model.get('profile')}
          />,
          document.getElementById('contents')
        );
        //this.renderReactComponent(GameMode);
        return this;
    }

    , shipChanged: function() {
       this.render(GameMode);
    }

    //, renderReactComponent: function(Component) {
      //ReactDOM.render(
        //<AppContainer>
          //<Component
         //so this isn't going to work because I need to keep
          //the old output and append the new output
          //BUT I want to update everything else when the ship
          //changes.  What to do?
            //ship={this.model.get('ship').toJSON()}
          ///>,
        //</AppContainer>,
        //document.getElementById('contents')
      //);
    //}
});


