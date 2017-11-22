import  React from 'react';
import  ReactDOM  from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Page from './page';

module.exports = {
  loadPage: function() {
    // hot reloading
    if (module.hot) {
        module.hot.accept('./page', () => {
              const NewApp = require('./page').default;
              render(NewApp)
            });
    }

    ReactDOM.render(<Page />,
                    document.getElementById('contents'),
    );
  }
};
