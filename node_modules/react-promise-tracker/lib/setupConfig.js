"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupConfig = exports.defaultConfig = void 0;

var _constants = require("./constants");

var defaultConfig = {
  area: _constants.defaultArea,
  delay: 0
}; // Defensive config setup, fulfill default values

exports.defaultConfig = defaultConfig;

var setupConfig = function setupConfig(outerConfig) {
  return {
    area: !outerConfig || !outerConfig.area ? _constants.defaultArea : outerConfig.area,
    delay: !outerConfig || !outerConfig.delay ? 0 : outerConfig.delay
  };
};

exports.setupConfig = setupConfig;