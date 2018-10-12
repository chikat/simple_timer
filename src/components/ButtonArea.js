import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { changeTimer, updateTimer } from '../actions/timer';

class ButtonArea extends Component {
  constructor() {
    super()

    this.changeText = 'ターン交代'
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid text-center">
          <Col>
            <Button bsSize="large" bsStyle="primary" block onClick={() => this.props.changeTimer()}>{this.changeText}</Button>
          </Col>
        </Row>
      </Grid>
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
    changeTimer: (timerID, newTimerID) => {
      const newIntervalID = setInterval(() => dispatch(updateTimer(newTimerID)), 1000)
      dispatch(changeTimer(timerID, newTimerID, newIntervalID))
    },
  }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, stateProps, dispatchProps, ownProps, {
    changeTimer: () => {
      if (stateProps.timer.runTimerID !== -1) {
        dispatchProps.changeTimer(stateProps.timer.runTimerID, stateProps.timer.nextTimerID)
      }
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ButtonArea);