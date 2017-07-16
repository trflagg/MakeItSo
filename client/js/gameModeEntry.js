import ReactDOM from 'react-dom';
import React from 'react';

import GameModel from './models/shipModel';
import GameMode from './react/components/gameMode';
import { AppContainer } from 'react-hot-loader';

// hot reloading
if (module.hot) {
    module.hot.accept('./react/components/gameMode/index', () => {
          const NewApp = require('./react/components/gameMode/index').default;
          render(NewApp)
        });
}

$.ajax({
  url: '/default-ship',
  mode: 'GET',
}).done(function(data) {
  var ship = new shipModel;
  ship.parse(data);
  ReactDOM.render(<GameMode ship={ship} profile={profile}/>, document.getElementById('contents'));
});

