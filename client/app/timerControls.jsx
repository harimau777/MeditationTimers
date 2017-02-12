import {connect} from 'react-redux';
import {incrementTickCount, nextTimer, startTimers, pauseTimers, resetTimers} from './actions.js';

const TimerControls = ({timers, index, tickCount, intervalID, startTimers, pauseTimers, resetTimers}) => (
  <div className="timerControls">
    <span className="button" onClick={() => startTimers(timers, index, tickCount, intervalID)}>Start Timers</span>
    <span className="button" onClick={() => pauseTimers(intervalID)}>Pause Timers</span>
    <span className="button" onClick={() => resetTimers(index, tickCount, intervalID)}>Reset Timers</span>
  </div>
);

//***** Refactoring to use a continuously running interval rather than chaining timers *****
function handleStartTimers(timers, index, tickCount, intervalID, dispatch) {
  //If the timer was not already running,
  //then start the timer
  let newIntervalID;
  if(!intervalID) {
    newIntervalID = window.setInterval(handleTick.bind(this), 1000);
    // newIntervalId = window.setInterval(() => handleTick(timers, index, tickCount, intervalID, dispatch), 1000);
    return dispatch(startTimers(newIntervalID));
  }

  // function handleTick() {
  // //function handleTick(timers, index, tickCount, intervalID, dispatch) {
  //   //If this is the last tick,
  //   //then handle the timer expiration,
  //   //else increment the tick count
  //   console.log('timers', timers, 'index', index, 'tickCount', tickCount, 'intervalID', newIntervalID);
  //   if (tickCount === timers[index] * 10){
  //   // if (tickCount === timers[index] * 60){
  //     console.log('In last tick');
  //     //If this is the last timer,
  //     //then reset the timers,
  //     //else move to the next timer
  //     if (index === timers.length){
  //       console.log('All timers have finished');  //Notify the user that all timers are finished
  //       return resetTimers(intervalID);
  //     } else {
  //       console.log('Timer has finished');        //Notify the user that the current timer is finished
  //       return dispatch(nextTimer());
  //     }
  //   } else {
  //     return dispatch(incrementTickCount());
  //   }
  // }
}

function handlePauseTimers(intervalID, dispatch) {
  if(intervalID) { //If the timer is running
    window.clearInterval(intervalID);  //Stop the timer
    return dispatch(pauseTimers());
  }
}

function handleResetTimers(index, tickCount, intervalID, dispatch) {
  if((tickCount > 0) || (index > 0)) {  //If any of the timers have run at all
    window.clearInterval(intervalID);  //Stop the timmer
    return dispatch(resetTimers());
  }
}

function handleTick() {
//function handleTick(timers, index, tickCount, intervalID, dispatch) {
  //If this is the last tick,
  //then handle the timer expiration,
  //else increment the tick count
  console.log('timers', this.timers, 'index', index, 'tickCount', tickCount, 'intervalID', intervalID);
  if (tickCount === timers[index] * 10){
  // if (tickCount === timers[index] * 60){
    console.log('In last tick');
    //If this is the last timer,
    //then reset the timers,
    //else move to the next timer
    if (index === timers.length){
      console.log('All timers have finished');  //Notify the user that all timers are finished
      return resetTimers(intervalID);
    } else {
      console.log('Timer has finished');        //Notify the user that the current timer is finished
      return dispatch(nextTimer());
    }
  } else {
    return dispatch(incrementTickCount());
  }
}

const mapStateToProps = (state) => {
  return {
    timers: state.timers,
    index: state.index,
    tickCount: state.tickCount,
    intervalID: state.intervalID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startTimers: (timers, index, tickCount, intervalID) => handleStartTimers(timers, index, tickCount, intervalID, dispatch),
    pauseTimers: (intervalID) => handlePauseTimers(intervalID, dispatch),
    resetTimers: (index, tickCount, intervalID) => handleResetTimers(index, tickCount, intervalID, dispatch)  
    // handleTick: () => handleTick(timers, index, tickCount, intervalID, dispatch)
    // handleTick: (timers, index, tickCount, intervalID) => handleTick(timers, index, tickCount, intervalID, dispatch)
  }
}

const TimerControlsContainer = connect(mapStateToProps, mapDispatchToProps)(TimerControls);

export {TimerControlsContainer};
