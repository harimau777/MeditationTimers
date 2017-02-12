function reducer(state = initialState, action) {
  switch(action.type) {
    case 'addTimer':
      return addTimer(state);
    case 'removeTimer':
      return removeTimer(state, action.index);
    case 'incrementTimer':
      return incrementTimer(state, action.index);
    case 'decrementTimer':
      return decrementTimer(state, action.index);
    case 'incrementTickCount':
      return incrementTickCount(state);
    case 'nextTimer':
      return nextTimer(state);
    case 'startTimers':
      return startTimers(state, action.intervalID);
    case 'pauseTimers':
      return pauseTimers(state);
    case 'resetTimers':
      return resetTimers(state);
    default:
      return state;
  }
}

function addTimer(state) {
  return Object.assign({}, state, {timers: [...state.timers, 10]});
}

function removeTimer(state, index) {
  const timersCopy = [...state.timers.slice(0, index), ...state.timers.slice(index + 1)];
  return Object.assign({}, state, {timers: timersCopy});
}

function incrementTimer(state, index) {
  const timersCopy = state.timers.slice(0); //Make a copy of the timers array
  timersCopy[index]++;
  return Object.assign({}, state, {timers: timersCopy});
}

function decrementTimer(state, index) {
  if (state.timers[index] === 0) {  //Do not allow the user to decrement the timer below zero minutes
    return state;
  }

  const timersCopy = state.timers.slice(0); //Make a copy of the timers array
  timersCopy[index]--;
  return Object.assign({}, state, {timers: timersCopy});
}

function incrementTickCount(state) {
  return Object.assign({}, state, {
    tickCount: state.tickCount + 1,
  });
}

function nextTimer(state) {
  console.log('In next timer');
  return Object.assign({}, state, {
    index: state.index + 1,
    tickCount: 0,
  });
}

function startTimers(state, intervalID) {
  return Object.assign({}, state, {
    intervalID: intervalID,
  });
}

function pauseTimers(state) {
  return Object.assign({}, state, {
    intervalID: undefined,
  });
}

function resetTimers(state) {
  return Object.assign({}, state, {
    index: 0,
    tickCount: 0,
    intervalID: undefined,
  });
};


export {reducer};
