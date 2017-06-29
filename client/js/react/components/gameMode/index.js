import React from 'react';
import Header from './header';
import SimpleScreen from './simpleScreen';

export default class GameMode extends React.Component {
  render() {
    const screenSelector = {
      SIMPLE: SimpleScreen
    };
    const Screen = screenSelector[this.props.ship.screen];

    return (
      <div id="gameMode">
        <Screen {...this.props} />
      </div>
    );
  }
}

