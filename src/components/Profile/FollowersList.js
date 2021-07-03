import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";

class FollowersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetail: false,
    };
  }

  render() {
    return (
      <div style={{ display: "flex", padding: "10px" }}>
        <Avatar src={this.props.follower.profile_pic} alt="Profile" />
        {this.props.follower.id ===
        this.props.cookies.get("auth-token").user.id ? (
          <Link to={{ pathname: "profile" }} style={{ color: "black" }}>
            <span
              className="ml-2 "
              style={{ fontWeight: "bold" }}
              onClick={() => {
                this.setState({ showDetail: true });
              }}
            >
              {this.props.follower.username}
            </span>
          </Link>
        ) : (
          <Link
            to={{ pathname: "user_profile", state: this.props.follower.id }}
            style={{ color: "black" }}
          >
            <span
              className="ml-2 "
              style={{ fontWeight: "bold" }}
              onClick={() => {
                this.setState({ showDetail: true });
              }}
            >
              {this.props.follower.username}
            </span>
          </Link>
        )}

        {this.state.showDetail ? window.location.reload() : null}
      </div>
    );
  }
}

export default withCookies(FollowersList);
