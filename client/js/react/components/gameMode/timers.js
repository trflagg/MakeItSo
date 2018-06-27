import React from 'react';
import _ from 'lodash';

import Timer from './timer';

class Timers extends React.Component {
  constructor(props) {
    super(props);
    const timers = _.mapValues(props.timers, timer => {
      const newTimer = Object.assign({}, timer);
      newTimer.visible = true;
      return newTimer;
    });
    this.state = {
      timers,
    };
    this.handleHitZero = this.handleHitZero.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const timers = this.state.timers;
    this.setState({
      timers: _.mapValues(nextProps.timers, (timer, timerId) => {
        // if it already exists, don't do anything
        if (timers[timerId]) {
          return timers[timerId];
        }
        // if it's new, set visible
        const newTimer = Object.assign({}, timer);
        newTimer.visible = true;
        return newTimer;
      })
    });
  }

  handleHitZero(timerId) {
    const newTimers = Object.assign({}, this.state.timers);
    if (newTimers[timerId]) {
      newTimers[timerId].visible = false;
    }
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
          timers[timerId].visible &&
            <Timer
              timer={timers[timerId]}
              timerId={timerId}
              key={timerId}
              onHitZero={this.handleHitZero}
            />
          )
        )}
      </div>
    );
  }
}

export default Timers;
