var __polyfillTimeout_timers = {};
function __polyfillTimeout_generateNewId() {
  var r = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  while (__polyfillTimeout_timers.hasOwnProperty(r)) { // check weather the id already exists
    r = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }
  return r;
}


function __polyfillTimeout_check() {
  if (Object.keys(__polyfillTimeout_timers).length <= 0) return;
  
  var t = Date.now();
  for (var timerId in __polyfillTimeout_timers) {
    if (__polyfillTimeout_timers.hasOwnProperty(timerId) && t > __polyfillTimeout_timers[timerId].time) {
      __polyfillTimeout_timers[timerId].callback();
      clearTimeout(timerId);
    }
  }
  requestIdleCallback(__polyfillTimeout_check);
}


function _setTimeout(callback, delay) {
  if (typeof(callback) != 'function') throw new Error("callback should be a function");
  if (typeof(delay) != 'number' || delay < 0) throw new Error("delay should be a positive number");
  var newId = __polyfillTimeout_generateNewId();
  __polyfillTimeout_timers[newId] = {
    callback: callback,
    time: Date.now() + delay
  };
  if (Object.keys(__polyfillTimeout_timers).length == 1) {
    requestIdleCallback(__polyfillTimeout_check);
  }
  return newId;
}

function _clearTimeout(id) {
  if (__polyfillTimeout_timers.hasOwnProperty(id)) delete __polyfillTimeout_timers[id]; 
}

module.exports = {
    __polyfillTimeout_timers,
    __polyfillTimeout_generateNewId,
    __polyfillTimeout_check,
    setTimeout: _setTimeout,
    clearTimeout: _clearTimeout,
}