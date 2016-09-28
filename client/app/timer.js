const Timer = (props) => {
  return (
    <div className="timer">
      <h1>Timer {props.index}</h1>
      <span>Time: {props.time} minutes</span>
      <span className='button increment' onClick={() => {props.handlers.clickIncrementTime(props.index)}}>Increment</span>
      <span className='button decrement' onClick={() => {props.handlers.clickDecrementTime(props.index)}}>Decrement</span>
      <span className='button remove' onClick={() => {props.handlers.clickRemoveTimer(props.index)}}>Remove</span>
    </div>
  );
};

class Timer {
  constructor(duration, callback) {
    this.id;                   //Timer id.  Used to cancel the timer.
    this.duration = duration;  //Duration of the timer in seconds
    this.elapsed = 0;          //Elapsed time in seconds.  Used when the timer is paused.
    this.start;                //Time that the timer was started.  Used to calculate this.elapsed.
    this.callback = (() => {   //Called when the timer expires.  Uses immediate execution to wrap user's callback
      () => {                  //  along with code to reset the expired timer.
        this.elapsed = 0;
        this.start = undefined;
        callback;
      };
    });
    this.callback = (callback) => {
      this.elapsed = 0;
      this.start = undefined;
      callback();
    }.bind(_______);
  }

  start() {
    this.start = new Date();
    if (this.elapsed === 0) {
      this.id = window.setTimeout(this.callback, this.duration);
    } else {
      this.id = window.setTimeout(this.callback, this.duration - this.elapsed);
    }
  }

  reset() {
    window.clearTimeout(this.id);
    this.elapsed = 0;
    this.start = undefined;
  }

  pause() {
    window.clearTimeout(this.id);
    if(this.date) { //If the timer has been started
      this.elapsed = new Date() - this.start;
      this.date = undefined;
    }
  }
}

export {Timer};