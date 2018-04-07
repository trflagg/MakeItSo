import React from 'react';
import _ from 'underscore';

import ShipSelector from './shipSelector';
import DecisionList from './decisionList';
import DecisionDetails from './decisionDetails';

export default class Page extends React.Component {

  constructor(props) {
    super(props);

    //var cached_ship = window.localStorage.getItem('selectedShip');

    this.state = {
      decisions: [],
      ships: [],
      selectedDecision: null,
      selectedShip: '',
    };

    this.onSelectShip = this.onSelectShip.bind(this);
    this.handleCommandClick = this.handleCommandClick.bind(this);
    this.handleMessageClicked = this.handleMessageClicked.bind(this);
  }

  componentWillMount() {
    $.ajax({
      url: '/admin/decisions/all-ships',
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
      url: `/admin/decisions/${ship_id}/all`,
    }).done(data => {
      this.setState({
        decisions: data.decisions,
      });
    });
  }


  handleCommandClick(decision) {
    this.setState({
      selectedDecision: decision,
    });
  }

  handleMessageClicked(message) {
    const decision = this.state.selectedDecision;
    const path = _.map(message.full_path().split('.'), encodeURIComponent).join('/');
    $.ajax({
      url: `/admin/decision/${decision._id}/${path}`,
      type: 'POST',
    }).done(data => {
      this.setState({
        decisions: this.state.decisions.concat(data),
        selectedDecision: data,
      })
    });
  }

  render() {
    return (
      <div className = 'page-container'>
        <ShipSelector
          className = 'ship-selector'
          ships = {this.state.ships}
          selectedShip = {this.state.selectedShip}
          onSelectShip = {this.onSelectShip}
        />
        <div className = 'decision-container'>
          <DecisionList
            className = 'decision-list'
            decisions = {this.state.decisions}
            onCommandClick = {this.handleCommandClick}
          />
          <DecisionDetails
            className = 'decision-details'
            decision = {this.state.selectedDecision}
            onMessageClicked = {this.handleMessageClicked}
          />
        </div>
      </div>
    );
  };

}


