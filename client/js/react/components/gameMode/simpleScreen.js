import React from 'react';

import Header from './header';
import GameScreen from './gameScreen';

const SimpleScreen = (props) => (
  <div>
    <Header {...props} />
    <GameScreen {...props} />
  </div>
);

export default SimpleScreen;
