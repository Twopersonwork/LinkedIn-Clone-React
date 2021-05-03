import "./InputOption.css";
import React, { Component } from "react";

class InputOption extends Component {
  render() {
    const { Icon, title, color, text } = this.props;
    return (
      <div className="inputOption">
        <Icon style={{ color: color }} />

        <span className="pl-2">{title}</span>
        <span className="pl-2">{text}</span>
      </div>
    );
  }
}

export default InputOption;
