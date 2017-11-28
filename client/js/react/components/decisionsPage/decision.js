import React from 'react';

import MessageList from './messageList';
import ShipModel from '../../../models/shipModel';
import DecisionDetails from './decisionDetails';

class Decision extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDetails: false,
    }

    this.handleCommandClick = this.handleCommandClick.bind(this);
  }

  handleCommandClick() {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  }

  render() {
    var decision = this.props.decision;
    return (
      <div className="decision">
        <h2 onClick={this.handleCommandClick}>{decision.message}</h2>
        <p className="last-result">
          {decision.lastResult}
        </p>
        {this.state.showDetails &&
          <DecisionDetails
            decision = {decision}
          />
        }
      </div>
    );
  }
}

export default Decision;
