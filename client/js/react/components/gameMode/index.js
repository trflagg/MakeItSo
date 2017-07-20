import React from 'react';

import SimpleScreen from './simpleScreen';
import BridgeScreen from './bridgeScreen';
import CrawlScreen from './crawlScreen';
import TitleScreen from './titleScreen';

export default class GameMode extends React.Component {
  constructor(props)  {
    super(props);

    this.state = {
      showDMScreen: false,
      screenHeight: this.calculateScreenHeight(),
    };

    this.handleCommandClick = this.handleCommandClick.bind(this);
    this.dmToggle = this.dmToggle.bind(this);

    window.addEventListener('resize', () => {
      this.setState({
        screenHeight: this.calculateScreenHeight(),
      });
    });
  }

  calculateScreenHeight() {
    const header = document.getElementById('header');
    if (header) {
      return window.innerHeight - header.clientHeight;
    }

    return window.innerHeight;
  }

  handleCommandClick(command) {
    this.props.ship.runCommand(command.full_path());
  }

  dmToggle() {
    this.setState({
      showDMScreen: !this.state.showDMScreen,
    });
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
        <Screen
          {...this.props}
          onCommandClick={this.handleCommandClick}
          onDMToggle={this.dmToggle}
          showDMScreen={this.state.showDMScreen}
          screenHeight={this.state.screenHeight}
        />
      </div>
    );
  }
}

