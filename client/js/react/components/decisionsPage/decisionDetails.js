import React from 'react';

import MessageList from './messageList';
import ShipModel from '../../../models/shipModel';


export default class DecisionDetails extends React.Component {

  render() {
    if (!this.props.decision || !this.props.decision.ship) {
      return null;
    }
    const ship = new ShipModel();
    ship.parse(this.props.decision.ship);
    const globals = this.props.decision.globals;

    return (
      <div className='decision'>
        <div className="last-result">
          {ship.get('lastResult')}
        </div>
        <div className="global-list">
          {Object.keys(globals).map(name => (
            <p key={name}>
              {name + ": " + globals[name]}
            </p>
          ))}
        </div>

        <div className="message-list">
          <MessageList
            messages = {ship.get('children')}
            onMessageClicked = {this.props.onMessageClicked}
          />
          <MessageList
            messages = {ship.get('crew')}
            onMessageClicked = {this.props.onMessageClicked}
          />
          <MessageList
            messages = {ship.get('shipControls')}
            onMessageClicked = {this.props.onMessageClicked}
          />
        </div>
      </div>
    );
  }
}
