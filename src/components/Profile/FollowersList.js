import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
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
        {/* <Link to={{ pathname: "user_profile", state: this.props.follower.id }}> */}
        <span
          className="ml-2 "
          style={{ fontWeight: "bold" }}
          onClick={() => {
            this.setState({ showDetail: true });
          }}
        >
          {this.props.follower.username}
        </span>
        {/* </Link> */}

        {this.state.showDetail &&
        this.props.follower.id ===
          this.props.cookies.get("auth-token").user.id ? (
          <Redirect to={{ pathname: "/profile" }} />
        ) : null}

        {this.state.showDetail ? (
          <React.Fragment>
            {this.props.follower.id !==
            this.props.cookies.get("auth-token").user.id ? (
              <React.Fragment>
                <Redirect
                  to={{
                    pathname: "/user_profile",
                    state: this.props.follower.id,
                  }}
                />
                {window.location.reload()}
              </React.Fragment>
            ) : null}
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default withCookies(FollowersList);
