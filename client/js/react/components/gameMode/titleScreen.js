import React from 'react';

import Header from './header';
import GameScreen from './gameScreen';
import CommandHolder from './commandHolder';

const TitleScreen = ({ ship }) => (
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

export default TitleScreen;
