import React from 'react';

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
    console.dir(dm);
    this.props.ship.runCommand(dm.full_path());
  }


  render() {
    const { dms } = this.props;

    return (
      <div>
        <div id="dmScreen">
          { this.state.dm ?
            <div /> :
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
