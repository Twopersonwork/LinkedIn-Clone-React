import "./InputOption.css";
import React, { Component } from "react";
import { withCookies } from "react-cookie";
import ReactTooltip from "react-tooltip";

class InputOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "grey",
    };
  }

  render() {
    // console.log("auth-user ", this.props.cookies.get("auth-user"));
    const { Icon, title, color, tooltip } = this.props;
    return (
      <div onClick={this.props.click} className="inputOption">
        <Icon
          style={{ color: color }}
          data-tip
          data-for={tooltip ? "registerTip" : null}
        />

        <span
          className="pl-2"
          style={{ color: color }}
          data-tip
          data-for={tooltip ? "registerTip" : null}
        >
          {title}
        </span>
        <ReactTooltip id="registerTip" place="bottom" effect="solid">
          This feature is dummy
        </ReactTooltip>
      </div>
    );
  }
}

export default withCookies(InputOption);
