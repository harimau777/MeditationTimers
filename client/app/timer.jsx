const Timer = ({index, duration, increment, decrement, remove}) => (
  <div className="timer">
    <h1>Timer {index}</h1>
    <div className="durationControl">
      <span className='button buttonIncrement' onClick={increment}>Increment</span>
      <span>{duration} minutes</span>
      <span className='button buttonDecrement' onClick={() => decrement(index)}>Decrement</span>
    </div>
    <span className="button buttonRemoveTimer" onClick={() => remove(index)}>Remove Timer</span>
  </div>
);

export {Timer};