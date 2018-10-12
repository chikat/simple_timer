import React, { Component } from 'react';
import Menubar from './Menubar';
import AppAlert from './AppAlert';
import MeasureArea from './MeasureArea';
import ButtonArea from './ButtonArea';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.title = 'ターン制時間計測アプリ'
  }

  render() {
    return (
      <div>
        <Menubar title={this.title} />
        <AppAlert />
        <MeasureArea />
        <ButtonArea />
      </div>
    );
  }
}

export default App;