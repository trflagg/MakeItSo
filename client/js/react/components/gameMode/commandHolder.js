import React from 'react';

import Command from './command';

class CommandHolder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChildren: this.props.commandHolder.get('show_children') || false
    };
  }

  handleHolderClick() {
    this.setState({
      showChildren: !this.state.showChildren,
    });
  }

  render() {
    const { commandHolder, onCommandClick, show } = this.props;
    return (
      <div>
      { show &&
        <div>
          { commandHolder.get('childMessageCount') > 0 &&
            commandHolder.get('text')  &&
            <div className="commandTextDiv" onClick={this.handleHolderClick.bind(this)}>
              <p className="commandItem">
                { commandHolder.get('text') }
                <span className={this.state.showChildren ?
                    "glyphicon glyphicon-play rotated" :
                    "glyphicon glyphicon-play"
                  } />
              </p>
              { commandHolder.get('level') &&
                <p className="commandItemLevel">
                  Level { commandHolder.get('level') }
                </p>
              }
            </div>
          }
          { this.state.showChildren &&
            <ul className="command-list">
              {commandHolder.get('children').models.map((child) => (
                <li key={child.get('id')}>
                  { child.get("children") ?
                    <CommandHolder
                      commandHolder={child}
                      onCommandClick={onCommandClick}
                      show={true}
                    /> :
                    <Command
                      command={child}
                      onClick={ onCommandClick }
                    />
                  }
                </li>
              ))}
            </ul>
          }
       </div>
      }
      </div>
    )
  }
}

export default CommandHolder;
