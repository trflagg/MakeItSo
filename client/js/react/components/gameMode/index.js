import React from 'react';
import SimpleScreen from './simpleScreen';
import BridgeScreen from './bridgeScreen';

export default class GameMode extends React.Component {
  render() {
    const screenSelector = {
      SIMPLE: SimpleScreen,
      BRIDGE: BridgeScreen,
    };
    const Screen = screenSelector[this.props.ship.get('screen')];

    return (
      <div id="gameMode">
        <Screen {...this.props} />
      </div>
    );
  }
}

