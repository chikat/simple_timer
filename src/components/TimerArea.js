import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from './Timer';

class TimerArea extends Component {
  constructor() {
    super()

    this.changeText = 'ターン交代'
  }

  render() {
    return (
      <Timer hours={this.props.timer.timers[this.props.timerID].hours} minutes={this.props.timer.timers[this.props.timerID].minutes} seconds={this.props.timer.timers[this.props.timerID].seconds} />
    );
  }
}

const mapStateToProps = state => {
  return {
    timer: state.timer,
  }
};

export default connect(mapStateToProps)(TimerArea);