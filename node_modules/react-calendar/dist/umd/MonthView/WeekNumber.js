"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = WeekNumber;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function WeekNumber(_ref) {
  var date = _ref.date,
      onClickWeekNumber = _ref.onClickWeekNumber,
      weekNumber = _ref.weekNumber;
  var props = {
    className: 'react-calendar__tile',
    style: {
      flexGrow: 1
    }
  };

  var children = /*#__PURE__*/_react["default"].createElement("span", null, weekNumber);

  return onClickWeekNumber ? /*#__PURE__*/_react["default"].createElement("button", _extends({}, props, {
    onClick: function onClick(event) {
      return onClickWeekNumber(weekNumber, date, event);
    },
    type: "button"
  }), children) : /*#__PURE__*/_react["default"].createElement("div", props, children);
}

WeekNumber.propTypes = {
  date: _propTypes["default"].instanceOf(Date).isRequired,
  onClickWeekNumber: _propTypes["default"].func,
  weekNumber: _propTypes["default"].node.isRequired
};