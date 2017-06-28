import ReactDOM from 'react-dom';
import React from 'react';

import GameMode from './react/components/gameMode';
import { AppContainer } from 'react-hot-loader';

// hot reloading
if (module.hot) {
    module.hot.accept('./react/components/gameMode/index', () => {
          const NewApp = require('./react/components/gameMode/index').default;
          render(NewApp)
        });
}

ReactDOM.render(<GameMode ship={shipData} profile={profile}/>, document.getElementById('contents'));
