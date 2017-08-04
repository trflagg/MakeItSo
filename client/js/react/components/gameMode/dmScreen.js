import React from 'react';

import DM from './dmContent';
import DMTable from './dmTable';

class DMScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dm: null
    };

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick(dm) {
    this.setState({
      dm: dm
    });
    this.props.ship.runCommand(dm.full_path());
  }

  render() {
    const { dms, ship } = this.props;

    return (
      <div>
        <div id="dmScreen">
          { this.state.dm ?
            <DM
              dm={this.state.dm}
              content={ship.get('lastDM')}
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
