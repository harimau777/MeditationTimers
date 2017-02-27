const Timer = ({index, duration, increment, decrement, remove}) => (
  <div className="timer">
    <h1>Timer {index + 1}</h1>
    <div className="durationControl">
      <span className='button buttonIncrement' onClick={increment}>Increment</span>
      <span className='timerDuration'>{duration} minute{duration !== 1 ? 's' : ''}</span>
      <span className='button buttonDecrement' onClick={() => decrement(index)}>Decrement</span>
    </div>
    <span className="button buttonRemoveTimer" onClick={() => remove(index)}>Remove Timer</span>
  </div>
);

Timer.propTypes = {
  index: React.PropTypes.number,
  duration: React.PropTypes.number,
  increment: React.PropTypes.func,
  decrement: React.PropTypes.func,
  remove: React.PropTypes.func
};

export {Timer};