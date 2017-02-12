const Timer = ({index, duration, increment, decrement}) => (
  <div className="timer">
    <h1>Timer {index}</h1>
    <span>Duration: {duration} minutes</span>
    <span className='button' onClick={increment}>Increment</span>
    <span className='button' onClick={() => decrement(index)}>Decrement</span>
  </div>
);

export {Timer};