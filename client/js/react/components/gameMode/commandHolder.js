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
    const { commandHolder, onCommandClick } = this.props;
    return (
      <div>
        { commandHolder.get('childMessageCount') > 0 &&
          commandHolder.get('text')  &&
          <div className="commandTextDiv" onClick={this.handleHolderClick.bind(this)}>
            <p className="commandItem">
              { commandHolder.get('text') }
              <span className="glyphicon glyphicon-play" />
            </p>
            <p className="commandItemLevel">
              Level { commandHolder.get('level') }
            </p>
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
    );
  }
}

export default CommandHolder;
