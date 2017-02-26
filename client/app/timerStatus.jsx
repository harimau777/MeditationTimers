import {timerTicks, startTimers, stopTimers, resetTimers} from './state/actions.js';

const TimerStatus = ({currentTimer, elapsedTime, duration}) => (
  <div className="timerStatus">
    <p>Current Timer: {currentTimer} Current Time: {formatTime(elapsedTime)} of {duration} minute{duration !== 1 ? 's' : ''}</p>
  </div>
);

//Return a string containing the seconds expressed as 'minutes:remainingSeconds'.
//A leading '0' is added if the minutes or remainingSeconds are less than 10.
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}

TimerStatus.propTypes = {
  currentTimer: React.PropTypes.number,
  elapsedTime: React.PropTypes.number,
  duration: React.PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    currentTimer: state.index,
    elapsedTime: state.tickCount,
    duration: state.timers[state.index],
  }
}

const TimerStatusContainer = ReactRedux.connect(mapStateToProps)(TimerStatus);

export {TimerStatusContainer};
