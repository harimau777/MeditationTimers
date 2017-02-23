import React from 'react';
import {connect} from 'react-redux';
import {Timer} from './timer.jsx';
import {incrementTimer, decrementTimer, addTimer, removeTimer} from './state/actions.js';

const TimerList = ({timers, increment, decrement, addTimer, removeTimer}) => (
  <div className="timerList">
    {
      timers.map((timer, index) => (
        <div key={index}>
          <Timer index={index} duration={timer} increment={() => increment(index)} decrement={() => decrement(index)} remove={() => removeTimer(index)} />
        </div>
      ))
    }

    <span className="button buttonAddTimer" onClick={addTimer}>Add Timer</span>
  </div>
);

TimerList.propTypes = {
  timers: React.PropTypes.array,
  increment: React.PropTypes.func,
  decrement: React.PropTypes.func,
  addTimer: React.PropTypes.func,
  removeTimer: React.PropTypes.func
};

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

const TimerListContainer = connect(mapStateToProps, mapDispatchToProps)(TimerList);

export {TimerListContainer};
