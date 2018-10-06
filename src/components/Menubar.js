import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { startTimer, stopTimer, updateTimer, resumeTimer } from '../actions/timer';

class Menubar extends Component {
  constructor() {
    super();

    this.startText = '開始';
    this.endText = '終了';
    this.stopText = '一時停止';
    this.resumeText = '再開';
  }

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="Menubar-title">{this.props.title}</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} onClick={() => !this.props.timer.running ? this.props.startTimer(0) : this.props.stopTimer(-1)}>
            {!this.props.timer.running ? this.startText : this.endText}
          </NavItem>
          {/* <NavItem eventKey={2} onClick={() => !this.props.timer.running ? this.props.resumeTimer(0) : this.props.stopTimer(-1)}>
            {!this.props.timer.running ? this.resumeText : this.stopText}
          </NavItem> */}
        </Nav>
      </Navbar>
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
    startTimer: (timerID) => {
      const intervalID = setInterval(() => dispatch(updateTimer(timerID)), 1000)
      dispatch(startTimer(timerID, intervalID))
    },
    stopTimer: (timerID) => dispatch(stopTimer(timerID)),
    resumeTimer: (timerID) => {
      const intervalID = setInterval(() => dispatch(updateTimer(timerID)), 1000)
      dispatch(resumeTimer(timerID, intervalID))
    }
  }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, stateProps, dispatchProps, ownProps, {
    startTimer: (timerID) => {
      if (!stateProps.timer.timers[timerID].started) {
        dispatchProps.startTimer(timerID)
      }
    },
    resumeTimer: (timerID) => {
      if (!stateProps.timer.timers[timerID].started) {
        dispatchProps.resumeTimer(timerID)
      }
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Menubar);