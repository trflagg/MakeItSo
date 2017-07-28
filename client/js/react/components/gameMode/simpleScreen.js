import React from 'react';

import Header from './header';
import GameScreen from './gameScreen';
import CommandHolder from './commandHolder';

class SimpleScreen extends React.Component {
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
    const { showDMScreen } = this.props;

    return (
      <div>
        <div className="gameScreen screen">
          { !this.props.showDMScreen &&
            <div id="simpleScreen">
              <GameScreen
                lastResult={this.props.ship.get('lastResult')}
                outputBegin={this.handleOutputBegin}
                outputDone={this.handleOutputDone}
              />
               <div id="commands">
                <div id="rootCommands">
                  <CommandHolder
                    commandHolder = {this.props.ship}
                    onCommandClick={this.props.onCommandClick}
                    show={this.state.showCommands}
                  />
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default SimpleScreen;
