import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";

class ActivityLeft extends Component {
  constructor(props) {
    super(props);

    this.state = {
      followers: "",
      following: "",
    };
  }

  componentDidMount() {
    fetch(
      `${
        process.env.REACT_APP_API_URL
      }/uapi/users/${this.props.cookies.get("auth-token").user.id}/no_of_follow/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState({ following: resp.no_following });
        this.setState({ followers: resp.no_followers });
      })
      .catch((error) => console.log(error));
  }

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
            <p className="sidebar__statNumber">{this.state.followers}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(ActivityLeft);
