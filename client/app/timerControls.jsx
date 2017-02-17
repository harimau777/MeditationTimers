import {connect} from 'react-redux';
import {setTickCount, nextTimer, startTimers, pauseTimers, resetTimers} from './actions.js';

const timerFinishedAudio = new Audio('../resources/timerFinished.mp3');
const allTimersFinishedAudio = new Audio('../resources/allTimersFinished.mp3');

const TimerControls = ({timers, index, tickCount, intervalID, startTimers, pauseTimers, resetTimers, handleTick}) => (
  <div className="timerControls controls">
    <span className="button" onClick={() => startTimers(timers, intervalID)}>Start Timers</span>
    <span className="button" onClick={() => pauseTimers(intervalID)}>Pause Timers</span>
    <span className="button" onClick={() => resetTimers(index, tickCount, intervalID)}>Reset Timers</span>
  </div>
);

//***** Refactoring to use a continuously running interval rather than chaining timers *****
function handleStartTimers(timers, intervalID, dispatch) {
  //If the timer was not already running,
  //then start the timer
  let newIntervalID;
  if(!intervalID) {
    const startTime = new Date().getTime();
    newIntervalID = window.setInterval(function () {return handleTick(timers, startTime, newIntervalID, dispatch)}, 1000);
    return dispatch(startTimers(newIntervalID));
  }
}

function handlePauseTimers(intervalID, dispatch) {
  if(intervalID) { //If the timer is running
    window.clearInterval(intervalID);  //Stop the timer
    return dispatch(pauseTimers());
  }
}

function handleResetTimers(index, tickCount, intervalID, dispatch) {
  if((tickCount > 0) || (index > 0) || intervalID) {  //If the timer is running or if any timer has run
    window.clearInterval(intervalID);  //Stop the timmer
    return dispatch(resetTimers());
  }
}

// function handleTick() {
function handleTick(timers, startTime, intervalID, dispatch) {
  //If this is the last tick,
  //then handle the timer expiration,
  //else increment the tick count
  const [tickCount, index] = adjustTickCount(timers, Math.round((new Date().getTime() - startTime) / 1000));
  if (tickCount === timers[index] * 10){
    //If this is the last timer,
    //then reset the timers,
    //else move to the next timer
    if (index === timers.length - 1){
      console.log('All timers have finished');  //Notify the user that all timers are finished
      allTimersFinishedAudio.play()
      return handleResetTimers(index, tickCount, intervalID, dispatch);
    } else {
      console.log('Timer has finished');        //Notify the user that the current timer is finished
      timerFinishedAudio.play();
      return dispatch(nextTimer());
    }
  } else {
    return dispatch(setTickCount(tickCount));
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

//Since the interval is running continuously, the tickCount during a given
//timer will also include the ticks that occured during previous timers.
//This function returns the tickCount of ticks that occured during the current
//timer and the index of the current timer.
const adjustTickCount = (timers, tickCount) => {  
  const recurse = (tickCount, index) => {
    if (tickCount <= timers[index] * 10) {
      return [tickCount, index];
    } else {
      return recurse(tickCount - timers[index] * 10, index + 1);
    }
  }

  return recurse(tickCount, 0)
}

const mapDispatchToProps = (dispatch) => {
  return {
    startTimers: (timers, intervalID) => handleStartTimers(timers, intervalID, dispatch),
    pauseTimers: (intervalID) => handlePauseTimers(intervalID, dispatch),
    resetTimers: (index, tickCount, intervalID) => handleResetTimers(index, tickCount, intervalID, dispatch),
    handleTick: (timers, startTime, intervalID) => handleTick(timers, startTime, intervalID, dispatch)
  }
}

const TimerControlsContainer = connect(mapStateToProps, mapDispatchToProps)(TimerControls);

export {TimerControlsContainer};
