import React from 'react';
import _ from 'underscore';

import Timer from './timer';

class Timers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: props.timers,
    };

    this.handleHitZero = this.handleHitZero.bind(this);
  }

  handleHitZero(timerId) {
    const newTimers = Object.assign({}, this.state.timers);
    delete newTimers[timerId];
    this.setState({
      timers: newTimers,
    });
  }

  render() {
    const { timers } = this.state;
    return (
      <div id="timers">
        {timers &&
        _.keys(timers).map(timerId => (
          <Timer
            timer={timers[timerId]}
            timerId={timerId}
            key={timerId}
            hitZero={this.handleHitZero}
          />
        ))}
      </div>
    );
  }
}

export default Timers;
