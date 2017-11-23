import React from 'react';

import ShipSelector from './shipSelector';

export default class Page extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ships: [],
      selectedShip: {},
    };

    this.onSelectShip = this.onSelectShip.bind(this);
  }

  componentWillMount() {
    $.ajax({
      url: 'all-ships',
      mode: 'GET',
    }).done(data => {
      this.setState({
        ships: data.ships,
      });
    });
  }

  onSelectShip(event) {
    var ship_id = event.target.value;
    this.setState({
      selectedShip: ship_id,
    });
    $.ajax({
      url: `${ship_id}/all`,
      mode: 'GET',
    }).done(data => {
      console.dir(data);
    });
  }

  render() {
    return (
      <div>
        <ShipSelector
          ships = {this.state.ships}
          selectedShip = {this.state.selectedShip}
          onSelectShip = {this.onSelectShip}
        />
      </div>
    );
  };

}


