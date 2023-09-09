const path = require('path');
const webpack = require('webpack');

var timers = {};
function generateNewId() {
  var r = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  while (timers.hasOwnProperty(r)) { // check weather the id already exists
    r = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }
  return r;
}


function check() {
  if (Object.keys(timers).length <= 0) return;
  
  var t = Date.now();
  for (var timerId in timers) {
    if (timers.hasOwnProperty(timerId) && t > timers[timerId].time) {
      timers[timerId].callback();
      clearTimeout(timerId);
    }
  }
  requestIdleCallback(check);
}


function _setTimeout(callback, delay) {
  if (typeof(callback) != 'function') throw new Error("callback should be a function");
  if (typeof(delay) != 'number' || delay < 0) throw new Error("delay should be a positive number");
  var newId = generateNewId();
  timers[newId] = {
    callback: callback,
    time: Date.now() + delay
  };
  if (Object.keys(timers).length == 1) {
    requestIdleCallback(check);
  }
  return newId;
}

function _clearTimeout(id) {
  if (timers.hasOwnProperty(id)) delete timers[id]; 
}

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      setTimeout: _setTimeout,
      clearTimeout: _clearTimeout,
    })
    //...
  ]
};