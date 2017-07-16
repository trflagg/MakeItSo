import React from 'react';

import Header from './header';
import GameScreen from './gameScreen';
import CommandHolder from './commandHolder';

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
    const { ship, onCommandClick } = this.props;

    return (
      <div>
        <Header {...this.props} />
        <div className="gameScreen screen">
          <div id="bridgeScreen" className="container-fluid">
            <div id="mainBody" className="right">
              <GameScreen
                lastResult = {ship.get('lastResult')}
                outputBegin={this.handleOutputBegin}
                outputDone={this.handleOutputDone}
              />
               <div id="commands">
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
                  show={this.state.showCommands}
                />
                <CommandHolder
                  id="crewCommands"
                  commandHolder = {ship.get('crew')}
                  onCommandClick= {onCommandClick}
                  show={this.state.showCommands}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BridgeScreen;
