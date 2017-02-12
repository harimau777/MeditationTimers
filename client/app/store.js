import {reducer} from './reducer.js';

const initialState = {
  timers: [1],     //Array holding the duration of the timers in minutes
  index: 0,         //Index of the currently running timer
  tickCount: 0,     //Number of one second ticks that have elapsed in the currently running timer
  intervalID: undefined,  //ID of the running interval, used to cancel the interval
};

let store = Redux.createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
console.log('Created store:', store);

export {store};
