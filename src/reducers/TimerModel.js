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
   */
  static get timerLength() {
    return 2;
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

    newState.running = this.checkRunning(newState)
    return newState;
  }

  /**
   * タイマーの状態を停止状態に変更する
   * @param state タイマーの状態
   * @param {number} timerID タイマーID
   * @return タイマーの停止状態
   */
  static stop(state, timerID = -1) {
    console.log(state.timers[0])
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

    newState.running = this.checkRunning(newState)
    return newState;
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
   * タイマー状態を停止に変更
   * @param timerState 
   * @return timerState
   */
  static stopTimerState(timerState) {
    clearInterval(timerState.intervalID);

    timerState.started = false;
    timerState.intervalID = -1;
    return timerState;
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
   */
  static copyTimerState(timerState, oldTimerState) {
    timerState.started = oldTimerState.started;
    timerState.intervalID = oldTimerState.intervalID;
    return timerState;
  }
  
  /**
   * 起動状態か確認
   * @param state 
   */
  static checkRunning(state) {
    for (var len = 0; len < this.timerLength; len++) {
      if (state.timers[len].started) {
        return true;
      }
    }
    return false;
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