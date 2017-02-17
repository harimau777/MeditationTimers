//***** Manage the list of timers *****
const addTimer = () => {return {type: 'addTimer'}};
const removeTimer = (index) => {return {type: 'removeTimer', index: index}};

//***** Adjust a timer *****
const incrementTimer = (index) => {return {type: 'incrementTimer', index: index}};
const decrementTimer = (index) => {return {type: 'decrementTimer', index: index}};

//***** Timer actions *****
const setTickCount = (tickCount) => {return {type: 'setTickCount', tickCount: tickCount}};
const nextTimer = () => {return {type: 'nextTimer'}};
const startTimers = (intervalID) => {return {type: 'startTimers', intervalID: intervalID}};
const pauseTimers = () => {return {type: 'pauseTimers'}};
const resetTimers = () => {return {type: 'resetTimers'}};

export {addTimer, removeTimer, incrementTimer, decrementTimer, setTickCount, nextTimer, startTimers, pauseTimers, resetTimers};
