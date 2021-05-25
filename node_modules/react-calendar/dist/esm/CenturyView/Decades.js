function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { getDecadeStart } from '@wojtekmaj/date-utils';
import TileGroup from '../TileGroup';
import Decade from './Decade';
import { getBeginOfCenturyYear } from '../shared/dates';
import { tileGroupProps } from '../shared/propTypes';
export default function Decades(props) {
  var activeStartDate = props.activeStartDate;
  var start = getBeginOfCenturyYear(activeStartDate);
  var end = start + 99;
  return /*#__PURE__*/React.createElement(TileGroup, _extends({}, props, {
    className: "react-calendar__century-view__decades",
    dateTransform: getDecadeStart,
    dateType: "decade",
    end: end,
    start: start,
    step: 10,
    tile: Decade
  }));
}
Decades.propTypes = _objectSpread({}, tileGroupProps);