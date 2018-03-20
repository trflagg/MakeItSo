import React from 'react';

import Header from './header';
import GameScreen from './gameScreen';
import CommandHolder from './commandHolder';

class CrawlScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showcommands: true,
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
        <div className="gameScreen screen">
          <div id="simpleScreen">
            <GameScreen
              lastResult = {ship.get('lastResult')}
              lastChildRun = {ship.get('lastChildRun')}
              lastUpdate = {ship.get('lastUpdate')}
              outputBegin={this.handleOutputBegin}
              outputDone={this.handleOutputDone}
            />
             <div id="commands">
              <div id="rootCommands">
                <CommandHolder
                  commandHolder = {ship}
                  onCommandClick={onCommandClick}
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

export default CrawlScreen;
