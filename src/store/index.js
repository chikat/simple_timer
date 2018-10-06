import { createStore } from 'redux';
import timeapp from '../reducers';

let store = createStore(timeapp);

export default store;