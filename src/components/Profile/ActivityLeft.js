import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";

class ActivityLeft extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__top">
          <img
            src="https://resi.ze-robot.com/dl/4k/4k-desktop-wallpaper.-1920%C3%971200.jpg"
            alt="background"
          />
          <Avatar
            src="https://static.hollywoodreporter.com/sites/default/files/2019/03/avatar-publicity_still-h_2019-compressed.jpg"
            className="sidebar__avatar"
          ></Avatar>
          <Link to={"/profile"}>
            <span style={{ fontWeight: "bold" }}>
              {this.props.cookies.get("auth-token").user.username}
            </span>
          </Link>
        </div>

        <div className="sidebar__stats">
          <div className="sidebar__stat">
            <p>Followers</p>
            <p className="sidebar__statNumber">126</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(ActivityLeft);
