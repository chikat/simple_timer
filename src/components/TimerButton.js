import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

export class TimerButton extends Component {
  render() {
    return (
      <Button onClick={() => this.props.handleClick(this.props.timerID)}>{this.props.text}</Button>
    )
  }
}

export default TimerButton;