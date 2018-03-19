import React from 'react';

import Header from './header';
import GameScreen from './gameScreen';
import CommandHolder from './commandHolder';

class TitleScreen extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      document.querySelector('h1').classList.add('titleFadeIn');
    }, 500);
    setTimeout(() => {
      document.querySelector('p').classList.add('titleFadeIn');
    }, 1500);
    setTimeout(() => {
      document.querySelector('a').classList.add('titleFadeIn');
    }, 2500);
  }

  render() {
    const { ship } = this.props;

    return (
      <div className="gameScreen screen">
        <div id="titleScreen">

          <div dangerouslySetInnerHTML={{
            __html: ship.get('lastResult')
          }} />

          <a className="continue" onClick={function() {
            ship.runCommand('Continue');
          }}>
          Continue
          </a>

      </div>
    </div>
    );
  }
};

export default TitleScreen;
