import React from 'react';

import DMScreen from './dmScreen';
import Header from './header';
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
      outputHistory: '',
      dmLastResult: '',
      screenLastResult: '',
      processingCommand: false,
      commandSource: null,
    };

    this.handleCommandClick = this.handleCommandClick.bind(this);
    this.dmToggle = this.dmToggle.bind(this);

    window.addEventListener('resize', () => {
      this.setState({
        screenHeight: this.calculateScreenHeight(),
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      outputHistory: this.state.outputHistory + '\n' + nextProps.ship.get('lastResult'),
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
      SIMPLE: {
        component: SimpleScreen,
        showHeader: true,
      },
      BRIDGE: {
        component: BridgeScreen,
        showHeader: true,
      },
      CRAWL: {
        component: CrawlScreen,
        showHeader: false,
      },
      TITLE: {
        component: TitleScreen,
        showHeader: false,
      },
    };
    const screen = screenSelector[this.props.ship.get('screen')];
    const ScreenComponent = screen.component;

    return (
      <div id="gameMode">
        { screen.showHeader &&
          <Header
            {...this.props}
            showDMScreen={this.state.showDMScreen}
            dm_button={true}
            onDMToggle={this.dmToggle}
          />
        }
        <div>
          <div className="gameScreen screen">
            { this.state.showDMScreen &&
              <DMScreen
                key="dm"
                ship={this.props.ship}
                dms={this.props.ship.get('directMessages')}
              />
            }
            <ScreenComponent
              {...this.props}
              onCommandClick={this.handleCommandClick}
              screenHeight={this.state.screenHeight}
              outputHistory={this.state.outputHistory}
            />
          </div>
        </div>
      </div>
    );
  }
}

