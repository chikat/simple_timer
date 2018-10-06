import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TimerArea from './TimerArea';

class MeasureArea extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6}>
            <TimerArea timerID={0} />
          </Col>
          <Col xs={6}>
            <TimerArea timerID={1} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default MeasureArea;