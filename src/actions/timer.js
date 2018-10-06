export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const RESUME_TIMER = 'RESUME_TIMER';
export const UPDATE_TIMER = 'UPDATE_TIMER';
export const CHANGE_TIMER = 'CHANGE_TIMER';
export const RESET_TIMER = 'RESET_TIMER';

export function startTimer(timerID = -1, intervalID) {
  return {
    type: START_TIMER,
    timerID: timerID,
    intervalID: intervalID,
  }
}

export function stopTimer(timerID = -1, intervalID) {
  return {
    type: STOP_TIMER,
    timerID: timerID,
    intervalID: intervalID,
  }
}

export function resumeTimer(timerID = -1) {
  return {
    type: RESUME_TIMER,
    timerID: timerID,
  }
}

export function resetTimer(timerID = -1) {
  return {
    type: RESET_TIMER,
    timerID: timerID,
  }
}

export function updateTimer(timerID = -1) {
  return {
    type: UPDATE_TIMER,
    timerID: timerID,
  }
}

export function changeTimer(timerID, newTimerID, newIntervalID) {
  return {
    type: CHANGE_TIMER,
    timerID: timerID,
    newTimerID: newTimerID,
    newIntervalID: newIntervalID,
  }
}