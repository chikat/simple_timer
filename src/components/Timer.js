import React, { Component } from 'react';

export class Timer extends Component {
  render() {
    return (
      <div className='TimeArea-font'>
        <span>{this.props.hours}</span>
        <span>:</span>
        <span>{this.props.minutes}</span>
        <span>:</span>
        <span>{this.props.seconds}</span>
      </div>
    )
  }
}

export default Timer;