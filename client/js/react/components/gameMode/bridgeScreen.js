import React from 'react';

import Header from './header';
import GameScreen from './gameScreen';
import CommandHolder from './commandHolder';
import Timers from './timers';

class BridgeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCommands: true,
    };

    this.handleOutputBegin = this.handleOutputBegin.bind(this);
    this.handleOutputDone = this.handleOutputDone.bind(this);
  }

  handleOutputBegin() {
    this.setState({
      showCommands: false,
    });
  }

  handleOutputDone() {
    this.setState({
      showCommands: true,
    });
  }

  render() {
    const { ship, onCommandClick, showDMScreen, redAlert } = this.props;

    return (
            <div id="bridgeScreen" className={"container-fluid " + (redAlert ? "red-alert" : "" )}>
              <div id="mainBody" className="right">
                <GameScreen
                  lastResult = {ship.get('lastResult')}
                  lastUpdate = {ship.get('lastUpdate')}
                  lastChildRun = {ship.get('lastChildRun')}
                  outputBegin={this.handleOutputBegin}
                  outputDone={this.handleOutputDone}
                />
                 <div id="commands">
                  <Timers
                    timers={ship.get('timers')}
                  />
                  <CommandHolder
                    id="rootCommands"
                    commandHolder = {ship}
                    onCommandClick= {onCommandClick}
                    show={this.state.showCommands}
                  />
                  <CommandHolder
                    id="shipCommands"
                    commandHolder = {ship.get('shipControls')}
                    onCommandClick= {onCommandClick}
                    show={this.state.showCommands && ship.get('shipControls').get('visible')}
                  />
                  <CommandHolder
                    id="crewCommands"
                    commandHolder = {ship.get('crew')}
                    onCommandClick= {onCommandClick}
                    show={this.state.showCommands && ship.get('crew').get('visible')}
                  />
                </div>
              </div>
            </div>
    );
  }
}

export default BridgeScreen;
