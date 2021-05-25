import React from 'react';
import Months from './YearView/Months';
export default function YearView(props) {
  function renderMonths() {
    return /*#__PURE__*/React.createElement(Months, props);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "react-calendar__year-view"
  }, renderMonths());
}