import React from 'react';

import DM from './dmContent';
import DMTable from './dmTable';

import './dmScreen.scss';

class DMScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dm: null
    };

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleDMClose = this.handleDMClose.bind(this);
  }

  handleRowClick(dm) {
    this.setState({
      dm: dm
    });
    this.props.ship.runCommand(dm.full_path());
  }

  handleDMClose() {
    this.setState({
      dm: null,
    });
  }

  render() {
    const { dms, ship } = this.props;

    return (
      <div>
        <div id="dmScreen">
          { this.state.dm ?
            <DM
              subject={this.state.dm.get('text')}
              content={ship.get('lastDM')}
              onClose={this.handleDMClose}
            /> :
            <DMTable
              dms={dms}
              onRowClick={this.handleRowClick}
            />
          }
        </div>
      </div>
    );
  }
}

export default DMScreen;
