import React from 'react';
import Decades from './CenturyView/Decades';
export default function CenturyView(props) {
  function renderDecades() {
    return /*#__PURE__*/React.createElement(Decades, props);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "react-calendar__century-view"
  }, renderDecades());
}