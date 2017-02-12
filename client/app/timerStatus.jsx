import {connect} from 'react-redux';
import {timerTicks, startTimers, stopTimers, resetTimers} from './actions.js';

const TimerStatus = ({currentTimer, elapsedTime, duration}) => (
  <div className="timerStatus">
    <p>Current Timer: {currentTimer} Current Time: {elapsedTime} of {duration * 60}</p>
  </div>
);

const mapStateToProps = (state) => {
  return {
    currentTimer: state.index,
    elapsedTime: state.tickCount,
    duration: state.timers[state.index],
  }
}

const TimerStatusContainer = connect(mapStateToProps)(TimerStatus);

export {TimerStatusContainer};
