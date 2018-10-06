import { START_TIMER, STOP_TIMER, RESUME_TIMER, CHANGE_TIMER, UPDATE_TIMER, RESET_TIMER } from '../actions/timer'
import TimerModel from './TimerModel'

function timer(state = TimerModel.initialState, action) {
  var newState = []
  switch (action.type) {
    case START_TIMER:
      newState = TimerModel.reset(state, -1)
      return TimerModel.start(newState, action.timerID, action.intervalID)
    case CHANGE_TIMER:
      newState = TimerModel.stop(state, action.timerID)
      return TimerModel.start(newState, action.newTimerID, action.newIntervalID)
    case STOP_TIMER:
      return TimerModel.stop(state, action.timerID)
    case RESUME_TIMER:
      return TimerModel.start(state, action.timerID, action.intervalID)
    case UPDATE_TIMER:
      return TimerModel.update(state, action.timerID)
    case RESET_TIMER:
      return TimerModel.reset(state, action.timerID)
    default:
      return state
  }
}

export default timer;