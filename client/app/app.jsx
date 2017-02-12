import {Provider} from 'react-redux';
import {store} from './store.js';
import {CurrentTimers} from './timerList.jsx';
import {TimerStatusContainer} from './timerStatus.jsx';
import {TimerControlsContainer} from './timerControls.jsx';

const App = () => (
  <div className="app">
    <CurrentTimers />
    <TimerStatusContainer />
    <TimerControlsContainer />
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
