// const ReactDOM = require('react-dom');
import {Timer} from './timer';
import {AppNav} from './appNav';

class App extends React.Component{
  //Constructor:
  constructor() {
    super();
    this.state = {
      //Timer state:
      timers: [1, 1, 1],  //Holds the duration of each timer in minutes

      //Running timer state:
      timer: new Timer(this.state.timers[0]);
      timerIndex: 0,  //Index into this.state.timers

      // currentTimer: 0,
      // currentTimerId: undefined,
      // currentTime: 0,
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

    this.clickAddTimer = this.clickAddTimer.bind(this);
    this.clickStartTimers = this.clickStartTimers.bind(this);
    this.clickPauseTimers = this.clickPauseTimers.bind(this);
    this.clickResetTimers = this.clickResetTimers.bind(this);
  }

  //Run timers contol methods:
  clickAddTimer() {
    // this.state.timers.push(new Timer());
    this.setState(() => {timers: this.state.timers.push(5)});
  }

  clickStartTimers() {
    console.log('Clicked start timers');
    if (this.state.timers.length === 0) {
      return
    };

    const callback = (index) => {
      console.log("Timer expired");

      // if(index < this.state.timers.length) {
      //   this.state.currentTimer = index;
      //   this.state.currentTime = 0;
      //   this.state.currentTimerId = setTimeout(callback, this.state.timers[index] * 60000, index + 1);
      // } else {
      //   return
      // };
    };

    if (this.state.currentTimer) {  //If there is a paused timer, resume it rather than creating a new timer.
      this.state.currentTimer.start();
    } else {
      setTimeout(callback, this.state.timers[0] * 60000, 1)
    }
  }

  clickPauseTimers() {
    console.log('Clicked pause timers');
    this.state.timer.pause();
    // this.state.currentTimer.pause();
  }

  clickResetTimers() {this.currentTimer = 0;
    console.log('Clicked reset timers');
    this.state.timer.reset();
    // this.state.currentTimer.reset();
    this.setState({currentTimer: 0, currentTimerId: undefined, currentTime: 0});
  }

  //Render method:
  render() {
    return (
      <div className="app">
        <header>
          <span className="logo">Meditation Timers</span>
          <AppNav />
        </header>
        <div className="timerList"></div>
          {this.state.timers.map((current, index) => <Timer key={index} index={index} time={this.state.timers[index]} handlers = {this.timerHandlers} />)}
        <div className="currentStatus">
          <p>Current Timer: {this.state.currentTimer} Current Time: {this.state.currentTime} of {this.state.timers[this.state.currentTimer]}</p>
        </div>
        <div className="controls">
          <p>
            <span className="button addTimer" onClick={this.clickAddTimer}>Add Timer</span>
            <span className="button startTimers" onClick={this.clickStartTimers}>Start Timers</span>
            <span className="button pauseTimers">Pause Timers</span>
            <span className="button resetTimers" onClick={this.clickResetTimers}>Reset Timers</span>
          </p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));