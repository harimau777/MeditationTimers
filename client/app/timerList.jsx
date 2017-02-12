import {connect} from 'react-redux';
import {Timer} from './timer.jsx';
import {incrementTimer, decrementTimer, addTimer, removeTimer} from './actions.js';

const TimerList = ({timers, increment, decrement, addTimer, removeTimer}) => (
  <div className="timerList">
    {console.log('Timers are:', timers)}
    {
      timers.map((timer, index) => (
        <div key={index}>
          <Timer index={index} duration={timer} increment={() => increment(index)} decrement={() => decrement(index)} />
          <span className="button" onClick={() => removeTimer(index)}>Remove Timer</span>
        </div>
      ))
    }

    <span className="button" onClick={addTimer}>Add Timer</span>
  </div>
);

const mapStateToProps = (state) => {
  return {
    timers: state.timers
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: (index) => dispatch(incrementTimer(index)),
    decrement: (index) => dispatch(decrementTimer(index)),
    addTimer: () => dispatch(addTimer()),
    removeTimer: (index) => dispatch(removeTimer(index))
  }
};

console.log('Connecting CurrentTimers');
const CurrentTimers = connect(mapStateToProps, mapDispatchToProps)(TimerList);

export {CurrentTimers};

// export {connectTimerList, TimerList};
