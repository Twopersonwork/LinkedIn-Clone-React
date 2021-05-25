"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDayOfWeek = getDayOfWeek;
exports.getBeginOfCenturyYear = getBeginOfCenturyYear;
exports.getBeginOfDecadeYear = getBeginOfDecadeYear;
exports.getBeginOfWeek = getBeginOfWeek;
exports.getWeekNumber = getWeekNumber;
exports.getBegin = getBegin;
exports.getBeginPrevious = getBeginPrevious;
exports.getBeginNext = getBeginNext;
exports.getEnd = getEnd;
exports.getEndPrevious = getEndPrevious;
exports.getRange = getRange;
exports.getValueRange = getValueRange;
exports.getCenturyLabel = getCenturyLabel;
exports.getDecadeLabel = getDecadeLabel;
exports.isWeekend = isWeekend;
exports.getEndPrevious2 = exports.getBeginNext2 = exports.getBeginPrevious2 = void 0;

var _dateUtils = require("@wojtekmaj/date-utils");

var _const = require("./const");

var _dateFormatter = require("./dateFormatter");

var SUNDAY = _const.WEEKDAYS[0];
var FRIDAY = _const.WEEKDAYS[5];
var SATURDAY = _const.WEEKDAYS[6];
/* Simple getters - getting a property of a given point in time */

function getDayOfWeek(date) {
  var calendarType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _const.CALENDAR_TYPES.ISO_8601;
  var weekday = date.getDay();

  switch (calendarType) {
    case _const.CALENDAR_TYPES.ISO_8601:
      // Shifts days of the week so that Monday is 0, Sunday is 6
      return (weekday + 6) % 7;

    case _const.CALENDAR_TYPES.ARABIC:
      return (weekday + 1) % 7;

    case _const.CALENDAR_TYPES.HEBREW:
    case _const.CALENDAR_TYPES.US:
      return weekday;

    default:
      throw new Error('Unsupported calendar type.');
  }
}
/**
 * Century
 */


function getBeginOfCenturyYear(date) {
  var beginOfCentury = (0, _dateUtils.getCenturyStart)(date);
  return (0, _dateUtils.getYear)(beginOfCentury);
}
/**
 * Decade
 */


function getBeginOfDecadeYear(date) {
  var beginOfDecade = (0, _dateUtils.getDecadeStart)(date);
  return (0, _dateUtils.getYear)(beginOfDecade);
}
/**
 * Week
 */

/**
 * Returns the beginning of a given week.
 *
 * @param {Date} date Date.
 * @param {string} calendarType Calendar type. Can be ISO 8601 or US.
 */


function getBeginOfWeek(date) {
  var calendarType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _const.CALENDAR_TYPES.ISO_8601;
  var year = (0, _dateUtils.getYear)(date);
  var monthIndex = (0, _dateUtils.getMonth)(date);
  var day = date.getDate() - getDayOfWeek(date, calendarType);
  return new Date(year, monthIndex, day);
}
/**
 * Gets week number according to ISO 8601 or US standard.
 * In ISO 8601, Arabic and Hebrew week 1 is the one with January 4.
 * In US calendar week 1 is the one with January 1.
 *
 * @param {Date} date Date.
 * @param {string} calendarType Calendar type. Can be ISO 8601 or US.
 */


function getWeekNumber(date) {
  var calendarType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _const.CALENDAR_TYPES.ISO_8601;
  var calendarTypeForWeekNumber = calendarType === _const.CALENDAR_TYPES.US ? _const.CALENDAR_TYPES.US : _const.CALENDAR_TYPES.ISO_8601;
  var beginOfWeek = getBeginOfWeek(date, calendarTypeForWeekNumber);
  var year = (0, _dateUtils.getYear)(date) + 1;
  var dayInWeekOne;
  var beginOfFirstWeek; // Look for the first week one that does not come after a given date

  do {
    dayInWeekOne = new Date(year, 0, calendarTypeForWeekNumber === _const.CALENDAR_TYPES.ISO_8601 ? 4 : 1);
    beginOfFirstWeek = getBeginOfWeek(dayInWeekOne, calendarTypeForWeekNumber);
    year -= 1;
  } while (date - beginOfFirstWeek < 0);

  return Math.round((beginOfWeek - beginOfFirstWeek) / (8.64e7 * 7)) + 1;
}
/**
 * Others
 */

/**
 * Returns the beginning of a given range.
 *
 * @param {string} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */


function getBegin(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return (0, _dateUtils.getCenturyStart)(date);

    case 'decade':
      return (0, _dateUtils.getDecadeStart)(date);

    case 'year':
      return (0, _dateUtils.getYearStart)(date);

    case 'month':
      return (0, _dateUtils.getMonthStart)(date);

    case 'day':
      return (0, _dateUtils.getDayStart)(date);

    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}

function getBeginPrevious(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return (0, _dateUtils.getPreviousCenturyStart)(date);

    case 'decade':
      return (0, _dateUtils.getPreviousDecadeStart)(date);

    case 'year':
      return (0, _dateUtils.getPreviousYearStart)(date);

    case 'month':
      return (0, _dateUtils.getPreviousMonthStart)(date);

    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}

function getBeginNext(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return (0, _dateUtils.getNextCenturyStart)(date);

    case 'decade':
      return (0, _dateUtils.getNextDecadeStart)(date);

    case 'year':
      return (0, _dateUtils.getNextYearStart)(date);

    case 'month':
      return (0, _dateUtils.getNextMonthStart)(date);

    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}

var getBeginPrevious2 = function getBeginPrevious2(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return (0, _dateUtils.getPreviousDecadeStart)(date, -100);

    case 'year':
      return (0, _dateUtils.getPreviousYearStart)(date, -10);

    case 'month':
      return (0, _dateUtils.getPreviousMonthStart)(date, -12);

    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
};

exports.getBeginPrevious2 = getBeginPrevious2;

var getBeginNext2 = function getBeginNext2(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return (0, _dateUtils.getNextDecadeStart)(date, 100);

    case 'year':
      return (0, _dateUtils.getNextYearStart)(date, 10);

    case 'month':
      return (0, _dateUtils.getNextMonthStart)(date, 12);

    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
};
/**
 * Returns the end of a given range.
 *
 * @param {string} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */


exports.getBeginNext2 = getBeginNext2;

function getEnd(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return (0, _dateUtils.getCenturyEnd)(date);

    case 'decade':
      return (0, _dateUtils.getDecadeEnd)(date);

    case 'year':
      return (0, _dateUtils.getYearEnd)(date);

    case 'month':
      return (0, _dateUtils.getMonthEnd)(date);

    case 'day':
      return (0, _dateUtils.getDayEnd)(date);

    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}

function getEndPrevious(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return (0, _dateUtils.getPreviousCenturyEnd)(date);

    case 'decade':
      return (0, _dateUtils.getPreviousDecadeEnd)(date);

    case 'year':
      return (0, _dateUtils.getPreviousYearEnd)(date);

    case 'month':
      return (0, _dateUtils.getPreviousMonthEnd)(date);

    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}

var getEndPrevious2 = function getEndPrevious2(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return (0, _dateUtils.getPreviousDecadeEnd)(date, -100);

    case 'year':
      return (0, _dateUtils.getPreviousYearEnd)(date, -10);

    case 'month':
      return (0, _dateUtils.getPreviousMonthEnd)(date, -12);

    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
};
/**
 * Returns an array with the beginning and the end of a given range.
 *
 * @param {string} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */


exports.getEndPrevious2 = getEndPrevious2;

function getRange(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return (0, _dateUtils.getCenturyRange)(date);

    case 'decade':
      return (0, _dateUtils.getDecadeRange)(date);

    case 'year':
      return (0, _dateUtils.getYearRange)(date);

    case 'month':
      return (0, _dateUtils.getMonthRange)(date);

    case 'day':
      return (0, _dateUtils.getDayRange)(date);

    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
/**
 * Creates a range out of two values, ensuring they are in order and covering entire period ranges.
 *
 * @param {string} rangeType Range type (e.g. 'day')
 * @param {Date} date1 First date.
 * @param {Date} date2 Second date.
 */


function getValueRange(rangeType, date1, date2) {
  var rawNextValue = [date1, date2].sort(function (a, b) {
    return a - b;
  });
  return [getBegin(rangeType, rawNextValue[0]), getEnd(rangeType, rawNextValue[1])];
}

function toYearLabel(locale) {
  var formatYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _dateFormatter.formatYear;
  var dates = arguments.length > 2 ? arguments[2] : undefined;
  return dates.map(function (date) {
    return formatYear(locale, date);
  }).join(' – ');
}
/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2001-2100.
 *
 * @param {Date|String|Number} date Date or a year as a string or as a number.
 */


function getCenturyLabel(locale, formatYear, date) {
  return toYearLabel(locale, formatYear, (0, _dateUtils.getCenturyRange)(date));
}
/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2011-2020.
 *
 * @param {Date|String|Number} date Date or a year as a string or as a number.
 */


function getDecadeLabel(locale, formatYear, date) {
  return toYearLabel(locale, formatYear, (0, _dateUtils.getDecadeRange)(date));
}
/**
 * Returns a boolean determining whether a given date is on Saturday or Sunday.
 *
 * @param {Date} date Date.
 */


function isWeekend(date) {
  var calendarType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _const.CALENDAR_TYPES.ISO_8601;
  var weekday = date.getDay();

  switch (calendarType) {
    case _const.CALENDAR_TYPES.ARABIC:
    case _const.CALENDAR_TYPES.HEBREW:
      return weekday === FRIDAY || weekday === SATURDAY;

    case _const.CALENDAR_TYPES.ISO_8601:
    case _const.CALENDAR_TYPES.US:
      return weekday === SATURDAY || weekday === SUNDAY;

    default:
      throw new Error('Unsupported calendar type.');
  }
}