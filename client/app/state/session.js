//Get session data
function getCookie() {
  const timers = document.cookie.match(/(?:^timers=)(\[(?:\d+,)*\d+\]$)/);
  if (timers) {
    return JSON.parse(timers[1]);
  }
}

//Update session data
function setCookie(timers) {
  document.cookie = `timers=${JSON.stringify(timers)}`;
}

export {getCookie, setCookie};
