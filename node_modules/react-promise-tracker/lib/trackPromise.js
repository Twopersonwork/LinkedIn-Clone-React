"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manuallyIncrementPromiseCounter = exports.manuallyDecrementPromiseCounter = exports.manuallyResetPromiseCounter = exports.trackPromise = exports.getCounter = exports.promiseCounterUpdateEventId = exports.emitter = void 0;

var _tinyEmmiter = require("./tinyEmmiter");

var _constants = require("./constants");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var emitter = new _tinyEmmiter.Emitter();
exports.emitter = emitter;
var promiseCounterUpdateEventId = "promise-counter-update";
exports.promiseCounterUpdateEventId = promiseCounterUpdateEventId;

var counter = _defineProperty({}, _constants.defaultArea, 0);

var getCounter = function getCounter(area) {
  return counter[area];
};

exports.getCounter = getCounter;

var trackPromise = function trackPromise(promise, area) {
  area = area || _constants.defaultArea;
  incrementPromiseCounter(area);

  var onResolveHandler = function onResolveHandler() {
    return decrementPromiseCounter(area);
  };

  promise.then(onResolveHandler, onResolveHandler);
  return promise;
};

exports.trackPromise = trackPromise;

var incrementPromiseCounter = function incrementPromiseCounter(area) {
  incrementCounter(area);
  var promiseInProgress = anyPromiseInProgress(area);
  emitter.emit(promiseCounterUpdateEventId, promiseInProgress, area);
};

var incrementCounter = function incrementCounter(area) {
  if (Boolean(counter[area])) {
    counter[area]++;
  } else {
    counter[area] = 1;
  }
};

var anyPromiseInProgress = function anyPromiseInProgress(area) {
  return counter[area] > 0;
};

var decrementPromiseCounter = function decrementPromiseCounter(area) {
  counter[area] > 0 && decrementCounter(area);
  var promiseInProgress = anyPromiseInProgress(area);
  emitter.emit(promiseCounterUpdateEventId, promiseInProgress, area);
};

var decrementCounter = function decrementCounter(area) {
  counter[area]--;
};

var manuallyResetPromiseCounter = function manuallyResetPromiseCounter(area) {
  area = area || _constants.defaultArea;
  counter[area] = 0;
  emitter.emit(promiseCounterUpdateEventId, false, area);
};

exports.manuallyResetPromiseCounter = manuallyResetPromiseCounter;

var manuallyDecrementPromiseCounter = function manuallyDecrementPromiseCounter(area) {
  area = area || _constants.defaultArea;
  decrementPromiseCounter(area);
};

exports.manuallyDecrementPromiseCounter = manuallyDecrementPromiseCounter;

var manuallyIncrementPromiseCounter = function manuallyIncrementPromiseCounter(area) {
  area = area || _constants.defaultArea;
  incrementPromiseCounter(area);
}; // TODO: Enhancement we could catch here errors and throw an Event in case there's an HTTP Error
// then the consumer of this event can be listening and decide what to to in case of error


exports.manuallyIncrementPromiseCounter = manuallyIncrementPromiseCounter;