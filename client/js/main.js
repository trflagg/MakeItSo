/**
 * main.js
 *
 * The client-side entry point.
 *
 */
import GameMode from  './react/components/gameMode/index';
import { AppContainer } from 'react-hot-loader';

var AppView = require('./views/appView');
var appView = new AppView();

var ReactDOM = require('react-dom');
var React = require('react');

const render = (Component) => {
  ReactDOM.render(
  <AppContainer>
    <Component />
  </AppContainer>,
  document.getElementById('contents')
);
};

render(GameMode);

// hotmodule
if (module.hot) {
    module.hot.accept('./react/components/gameMode/index', () => {
          const NewApp = require('./react/components/gameMode/index').default;
          render(NewApp)
        });
}
