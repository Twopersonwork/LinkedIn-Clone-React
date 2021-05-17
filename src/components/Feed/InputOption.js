import "./InputOption.css";
import React, { Component } from "react";
import { withCookies } from "react-cookie";

class InputOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "grey",
    };
  }

  render() {
    // console.log("auth-user ", this.props.cookies.get("auth-user"));
    const { Icon, title, color } = this.props;
    return (
      <div onClick={this.props.function} className="inputOption">
        <Icon style={{ color: color }} />

        <span className="pl-2" style={{ color: color }}>
          {title}
        </span>
      </div>
    );
  }
}

export default withCookies(InputOption);
