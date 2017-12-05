import React from 'react';

import MessageList from './messageList';
import ShipModel from '../../../models/shipModel';


export default class DecisionDetails extends React.Component {

  render() {
    const ship = new ShipModel();
    ship.parse(this.props.decision.ship);
    const globals = this.props.decision.globals;

    return (
      <div>
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
          />
          <MessageList
            messages = {ship.get('crew')}
          />
          <MessageList
            messages = {ship.get('shipControls')}
          />
        </div>
      </div>
    );
  }
}
