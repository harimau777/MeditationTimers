import {setTickCount, nextTimer, startTimers, pauseTimers, resetTimers} from './state/actions.js';

const timerFinishedAudio = new Audio('../resources/timerFinished.mp3');
const allTimersFinishedAudio = new Audio('../resources/allTimersFinished.mp3');

const TimerControls = ({timers, index, tickCount, intervalID, startTimers, pauseTimers, resetTimers, handleTick}) => (
  <div className="timerControls controls">
    <span className="button buttonStart" onClick={() => startTimers(timers, tickCount, intervalID)}>Start Timers</span>
    <span className="button buttonPause" onClick={() => pauseTimers(intervalID)}>Pause Timers</span>
    <span className="button buttonReset" onClick={() => resetTimers(index, tickCount, intervalID)}>Reset Timers</span>
  </div>
);

TimerControls.propTypes = {
  timers: React.PropTypes.array,
  index: React.PropTypes.number,
  tickCount: React.PropTypes.number,
  intervalID: React.PropTypes.number,
  startTimers: React.PropTypes.func,
  pauseTimers: React.PropTypes.func,
  resetTimers: React.PropTypes.func,
  handleTick: React.PropTypes.func
};

//***** Refactoring to use a continuously running interval rather than chaining timers *****
function handleStartTimers(timers, tickCount, intervalID, dispatch) {
  //If the timer was not already running,
  //then start the timer
  let newIntervalID;
  if(!intervalID) {
    const startTime = new Date().getTime();
    newIntervalID = window.setInterval(function () {return handleTick(timers, tickCount, startTime, newIntervalID, dispatch)}, 1000);
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

//handleTick is called each time the interval expires.
//It handles dispatching actions to update the store's tickCount and index.
//It also detects and handles the behavior when the end of a timer has been reached
//and when the end of all timers have been reached.
//
//Since handleTick is called by the interval it keeps track of the number of elapsed ticks separately
//from the store's tickCount.  It does this by comparing the current time to the startTime of the timer.
//Since the startTime gets updated whenever the timer is paused and then started again, it uses a tickOffset
//to keep track of how much time had elapsed at the point when the timer was last paused.
function handleTick(timers, tickOffset, startTime, intervalID, dispatch) {
  //If this is the last tick,
  //then handle the timer expiration,
  //else increment the tick count
  const [tickCount, index] = adjustTickCount(timers, Math.round((new Date().getTime() - startTime) / 1000) + tickOffset);
  if (tickCount === timers[index] * 60){
    //If this is the last timer,
    //then reset the timers,
    //else move to the next timer
    if (index === timers.length - 1){
      allTimersFinishedAudio.play()
      return handleResetTimers(index, tickCount, intervalID, dispatch);
    } else {
      timerFinishedAudio.play();
      return dispatch(nextTimer());
    }
  } else {
    return dispatch(setTickCount(tickCount));
  }
}

//Since the interval is running continuously, the tickCount during a given
//timer will also include the ticks that occured during previous timers.
//This function returns the tickCount of ticks that occured during the current
//timer and the index of the current timer.
const adjustTickCount = (timers, tickCount) => {  
  const recurse = (tickCount, index) => {
    if (tickCount <= timers[index] * 60) {
      return [tickCount, index];
    } else {
      return recurse(tickCount - timers[index] * 60, index + 1);
    }
  }

  return recurse(tickCount, 0)
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
    startTimers: (timers, tickCount, intervalID) => handleStartTimers(timers, tickCount, intervalID, dispatch),
    pauseTimers: (intervalID) => handlePauseTimers(intervalID, dispatch),
    resetTimers: (index, tickCount, intervalID) => handleResetTimers(index, tickCount, intervalID, dispatch),
    handleTick: (timers, tickOffset, startTime, intervalID) => handleTick(timers, tickOffset, startTime, intervalID, dispatch)
  }
}

const TimerControlsContainer = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TimerControls);

export {TimerControlsContainer};
