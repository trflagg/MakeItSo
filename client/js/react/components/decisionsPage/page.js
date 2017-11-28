import React from 'react';

import ShipSelector from './shipSelector';
import DecisionList from './decisionList';

export default class Page extends React.Component {

  constructor(props) {
    super(props);

    //var cached_ship = window.localStorage.getItem('selectedShip');

    this.state = {
      decisions: [],
      ships: [],
      selectedShip: '',
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

    if (this.state.selectedShip) {
      this.loadShip(this.state.selectedShip);
    }
  }

  onSelectShip(event) {
    var ship_id = event.target.value;
    this.setState({
      selectedShip: ship_id,
    });

    window.localStorage.setItem('selectedShip', ship_id);

    this.loadShip(ship_id);
  }

  loadShip(ship_id) {
    $.ajax({
      url: `${ship_id}/all`,
      mode: 'GET',
    }).done(data => {
      this.setState({
        decisions: data.decisions,
      });
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
        <DecisionList
          decisions = {this.state.decisions}
        />
      </div>
    );
  };

}


