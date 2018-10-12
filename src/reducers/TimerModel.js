class TimerModel {
  /**
   * タイマー状態の初期状態
   */
  static get initialState() {
    var timers = []
    for (var len = 0; len < this.timerLength; len++) {
      timers.push(this.initialTimerState)
    }
    return {
      running: false,
      runTimerID: -1,
      nextTimerID: -1,
      timers: timers,
    };
  }

  /**
   * タイマーの初期状態
   */
  static get initialTimerState() {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00',
      time: 0,
      started: false,
      intervalID: -1
    }
  }

  /**
   * timerの数
   * 
   * @return timerLength
   */
  static get timerLength() {
    return 2;
  }

  /**
   * 次のタイマーIDを取得
   * @param state 
   * @return nextTimerID
   */
  static nextTimerID(timerID) {
    if(this.validateTimerID(timerID)) {
      return ++timerID % 2;
    }
    return -1;
  }

  /**
   * 正しい範囲のTimerIDかどうか
   * @param {number} timerID 
   */
  static validateTimerID(timerID) {
    return -1 < timerID < this.timerLength;
  }

  /**
   * タイマーの状態を開始状態に変更する
   * @param state タイマーの状態
   * @param {number} timerID タイマーID
   * @param {number} intervalID setInterval()で得られたID
   * @return タイマーの開始状態
   */
  static start(state, timerID = -1, intervalID) {
    var newState = Object.assign([], state);
    if (timerID === -1) {
      for (var id = 0; id < this.timerLength; id++) {
        newState.timers[id].started = true;
        newState.timers[id].intervalID = intervalID;
      }
    } else if (this.validateTimerID(timerID)) {
      newState.timers[timerID].started = true;
      newState.timers[timerID].intervalID = intervalID;
    }

    return this.updateRunning(newState);
  }

  /**
   * タイマーの状態を停止状態に変更する
   * @param state タイマーの状態
   * @param {number} timerID タイマーID
   * @return タイマーの停止状態
   */
  static stop(state, timerID = -1) {
    var newState = Object.assign([], state);
    if (timerID === -1) {
      for (var id = 0; id < this.timerLength; id++) {
        clearInterval(state.timers[id].intervalID);
        newState.timers[id].started = false;
        newState.timers[id].intervalID = -1;
      }
    } else if (this.validateTimerID(timerID)) {
      clearInterval(state.timers[timerID].intervalID);
      newState.timers[timerID].started = false;
      newState.timers[timerID].intervalID = -1;
    }

    return this.updateRunning(newState);
  }

  /**
   * タイマーの時間を1秒進める
   * @param state タイマーの時間の状態
   * @param {number} timerID タイマーID
   * @return 時間を1秒進めた新しい状態
   */
  static update(state, timerID = -1) {
    var newState = Object.assign([], state);
    if (timerID === -1) {
      for (var id = 0; id < this.timerLength; id++) {
        newState.timers[id] = this.updateTimerState(newState.timers[id])
      }
    } else if (this.validateTimerID(timerID)) {
      newState.timers[timerID] = this.updateTimerState(newState.timers[timerID])
    }

    return newState;
  }

  /**
   * タイマーの時間をリセットする
   * @param {number} timerID タイマーID
   * @return タイマーの初期状態
   */
  static reset(state, timerID = -1) {
    var newState = Object.assign([], state);
    if (timerID === -1) {
      for (var id = 0; id < this.timerLength; id++) {
        newState.timers[id] = this.resetTimerState(id, state.timers[id])
      }
    } else if (this.validateTimerID(timerID)) {
      newState.timers[timerID] = this.resetTimerState(timerID, state.timers[timerID])
    }
    
    return newState;
  }

  /**
   * タイマー状態を1秒更新
   * @param timerState 
   * @return timerState
   */
  static updateTimerState(timerState) {
    const time = timerState.time + 1;
    const hours = this.toHours(time);
    const minutes = this.toMinutes(time);
    const seconds = this.toSeconds(time);

    timerState.hours = this.toText(hours);
    timerState.minutes = this.toText(minutes);
    timerState.seconds = this.toText(seconds);
    timerState.time = time;
    return timerState;
  }

  /**
   * タイマー状態をリセット
   * @param {number} timerID 
   * @param oldTimerState 
   * @return newState
   */
  static resetTimerState(timerID, oldTimerState) {
    var newState = this.initialTimerState
    newState.started = oldTimerState.started;
    newState.intervalID = oldTimerState.intervalID;
    return newState;
  }

  /**
   * タイマー起動状態のコピー
   * @param initTimerState 
   * @param oldTimerState 
   * @return timerState
   */
  static copyTimerState(timerState, oldTimerState) {
    timerState.started = oldTimerState.started;
    timerState.intervalID = oldTimerState.intervalID;
    return timerState;
  }
  
  /**
   * 起動中のタイマーIDを取得
   * @param state 
   * @return timerIDs
   */
  static runTimerIDs(state) {
    var timerIDs = []
    for (var id = 0; id < this.timerLength; id++) {
      if (state.timers[id].started) {
        timerIDs.push(id);
      }
    }
    return timerIDs;
  }

  /**
   * 起動状態の更新
   * @param state 
   */
  static updateRunning(state) {
    let timerIDs = this.runTimerIDs(state);
    if (timerIDs.length === 1) {
      state.running = true;
      state.runTimerID = timerIDs[0];
      state.nextTimerID = this.nextTimerID(timerIDs[0]);
    } else {
      state.running = false;
      state.runTimerID = -1;
      state.nextTimerID = -1;
    }
    return state;
  }

  static toHours(time) {
    return parseInt(time / 60 / 60, 10)
  }

  static toMinutes(time) {
    return parseInt(time / 60 % 60, 10)
  }

  static toSeconds(time) {
    return time % 60
  }

  static toText(time) {
    return ('00' + time).slice(-2)
  }
}

export default TimerModel;