import React from 'react';
import Years from './DecadeView/Years';
export default function DecadeView(props) {
  function renderYears() {
    return /*#__PURE__*/React.createElement(Years, props);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "react-calendar__decade-view"
  }, renderYears());
}