// const ReactDOM = require('react-dom');
import {Timer} from './timer';

class App extends React.Component{
  //Constructor:
  constructor() {
    super();
    this.state = {
      //Timer state:
      timers: [5],

      //Running timer state:
      currentTimer: 0,
      currentTimerId: undefined,
      currentTime: 0,
    }

    this.timerHandlers = {
      clickIncrementTime: (index) => {
        this.setState(() => {timers: this.state.timers[index]++});
      },

      clickDecrementTime: (index) => {
        this.setState(() => {timers: this.state.timers[index]--});
      },

      clickRemoveTimer: (index) => {
        this.setState(() => {timers: this.state.timers.splice(index, 1)});
      }
    }
  }

  //Run timers contol methods:
  clickAddTimer() {
    // this.state.timers.push(new Timer());
    this.setState(timers.push(5));
  }

  clickStartTimers() {
    const callback = (index) => {
      //Play sound

      if (index + 1 < this.state.timers.length) {
        var timerId = setTimeout(callback, this.state.timers[index] * 60000, index + 1);
        this.setState({currentTimer: index + 1, currentTimerId: timerId});
      } else {
        return;
      }
    };

    callback(0);
  }

  clickPauseTimers() {
    console.log('Clicked pause timers');
  }

  clickResetTimers() {this.currentTimer = 0;
    this.clearTimeout(this.state.currentTimer);
    this.setState({currentTimer: 0, currentTimerId: undefined, currentTime: 0});
  }

  //Timer Handlers:
  // clickIncrementTime(index) {
  //   this.setState(() => {timers: timers[index]++});
  // }

  // clickDecrementTime(index) {
  //   this.setState(() => {timers: timers[index]--});
  // }

  // clickRemoveTimer(index) {
  //   this.setState(() => {timers: timers.splice(index, 1)});
  // };

  //Render method:
  render() {
    return (
      <div className="app">
        <h1>Meditation Timers</h1>
        <div className="timerList"></div>
          {this.state.timers.map((current, index) => <Timer key={index} index={index} time={this.state.timers[index]} handlers = {this.timerHandlers} />)}
        <div className="currentStatus">
          <p>Timer: {this.state.currentTimer} Current Time: {this.state.currentTime} of {this.state.timers[this.state.currentTimer]}</p>
        </div>
        <div className="controls">
          <span className="addTimer">Add Timer</span>
          <span className="startTimers">Start Timers</span>
          <span className="pauseTimers">Pause Timers</span>
          <span className="resetTimers">Reset Timers</span>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));