import React from 'react';
import SimpleScreen from './simpleScreen';
import BridgeScreen from './bridgeScreen';
import CrawlScreen from './crawlScreen';
import TitleScreen from './titleScreen';

export default class GameMode extends React.Component {

  handleCommandClick(command) {
    this.props.ship.runCommand(command.full_path());
  }

  render() {
    const screenSelector = {
      SIMPLE: SimpleScreen,
      BRIDGE: BridgeScreen,
      CRAWL: CrawlScreen,
      TITLE: TitleScreen,
    };
    const Screen = screenSelector[this.props.ship.get('screen')];

    return (
      <div id="gameMode">
        <Screen {...this.props} onCommandClick={this.handleCommandClick.bind(this)}/>
      </div>
    );
  }
}

