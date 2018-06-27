import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsRemaining: props.timer.timeInSeconds
    };
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      const secondsRemaining = this.state.secondsRemaining - 1;
      if (secondsRemaining <= 0) {
        this.props.onHitZero(this.props.timerId);
      } else {
        this.setState({
          secondsRemaining: this.state.secondsRemaining - 1,
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="timer commandTextDiv">
        <p className="timerString">
          {`${this.props.timer.timerString}`} <br/>
          {`${this.state.secondsRemaining}s`}
        </p>
      </div>
    );
  }

};

export default Timer;
