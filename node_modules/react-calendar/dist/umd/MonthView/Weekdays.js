"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Weekdays;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dateUtils = require("@wojtekmaj/date-utils");

var _Flex = _interopRequireDefault(require("../Flex"));

var _dates = require("../shared/dates");

var _dateFormatter = require("../shared/dateFormatter");

var _propTypes2 = require("../shared/propTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var className = 'react-calendar__month-view__weekdays';

function Weekdays(props) {
  var calendarType = props.calendarType,
      _props$formatShortWee = props.formatShortWeekday,
      formatShortWeekday = _props$formatShortWee === void 0 ? _dateFormatter.formatShortWeekday : _props$formatShortWee,
      locale = props.locale,
      onMouseLeave = props.onMouseLeave;
  var anyDate = new Date();
  var beginOfMonth = (0, _dateUtils.getMonthStart)(anyDate);
  var year = (0, _dateUtils.getYear)(beginOfMonth);
  var monthIndex = (0, _dateUtils.getMonth)(beginOfMonth);
  var weekdays = [];

  for (var weekday = 1; weekday <= 7; weekday += 1) {
    var weekdayDate = new Date(year, monthIndex, weekday - (0, _dates.getDayOfWeek)(beginOfMonth, calendarType));
    var abbr = (0, _dateFormatter.formatWeekday)(locale, weekdayDate);
    weekdays.push( /*#__PURE__*/_react["default"].createElement("div", {
      key: weekday,
      className: "".concat(className, "__weekday")
    }, /*#__PURE__*/_react["default"].createElement("abbr", {
      "aria-label": abbr,
      title: abbr
    }, formatShortWeekday(locale, weekdayDate).replace('.', ''))));
  }

  return /*#__PURE__*/_react["default"].createElement(_Flex["default"], {
    className: className,
    count: 7,
    onFocus: onMouseLeave,
    onMouseOver: onMouseLeave
  }, weekdays);
}

Weekdays.propTypes = {
  calendarType: _propTypes2.isCalendarType.isRequired,
  formatShortWeekday: _propTypes["default"].func,
  locale: _propTypes["default"].string,
  onMouseLeave: _propTypes["default"].func
};