const Timer = (props) => {
  return (
    <div className="timer">
      <h1>Timer {props.index}</h1>
      <span>Time: {props.time}</span>
      <span className='incrementTimerButton' onClick={props.handlers.clickIncrementTime(props.index)}>Increment</span>
      <span className='decrementTimerButton' onClick={props.handlers.clickDecrementTime(props.index)}>Decrement</span>
      <span className='removeTimerButton' onClick={props.handlers.clickRemoveTimer(props.index)}>Remove Timer</span>
    </div>
  );
};

export {Timer};
// window.Timer = Timer;