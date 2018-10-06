import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from './Timer';
import TimerButton from './TimerButton';
import { changeTimer, updateTimer } from '../actions/timer';

class TimerArea extends Component {
  constructor() {
    super()

    this.changeText = 'ターン交代'
  }

  render() {
    return (
      <div>
        <Timer hours={this.props.timer.timers[this.props.timerID].hours} minutes={this.props.timer.timers[this.props.timerID].minutes} seconds={this.props.timer.timers[this.props.timerID].seconds} />
        <TimerButton text={this.changeText} handleClick={this.props.changeTimer} timerID={this.props.timerID} />
      </div>
    );
  }
}
    
const mapStateToProps = state => {
  return {
    timer: state.timer,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeTimer: (timerID) => {
      const newTimerID = timerID === 0 ? 1 : 0
      const newIntervalID = setInterval(() => dispatch(updateTimer(newTimerID)), 1000)
      dispatch(changeTimer(timerID, newTimerID, newIntervalID))
    },
  }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, stateProps, dispatchProps, ownProps, {
    changeTimer: (timerID) => {
      if (stateProps.timer.timers[timerID].started) {
          dispatchProps.changeTimer(timerID)
      }
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TimerArea);