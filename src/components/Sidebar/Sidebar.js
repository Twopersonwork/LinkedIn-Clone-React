import { Avatar } from "@material-ui/core";
import { FaHashtag } from "react-icons/fa";
import "./Sidebar.css";
import { withCookies } from "react-cookie";
import { Link } from "react-router-dom";

import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile_pic: "",
    };
  }

  componentDidMount() {
    // console.log(this.props.cookies.get("username"));
    fetch(
      `${process.env.REACT_APP_API_URL}/uapi/users/${
        this.props.cookies.get("auth-token").user.id
      }/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState({ profile_pic: resp.profile_pic });
      })
      .catch((error) => console.log(error));
  }

  recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <FaHashtag className="sidebar__hash" />
      <span className="p-1">{topic}</span>
    </div>
  );

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__top">
          <img
            src="https://resi.ze-robot.com/dl/4k/4k-desktop-wallpaper.-1920%C3%971200.jpg"
            alt="background"
          />
          {this.state.profile_pic ? (
            <Avatar src={this.state.profile_pic} alt="Profile" />
          ) : (
            <Avatar
              className="post__image"
              src="/images/user.svg"
              alt="Profile"
            />
          )}
          <Link to={"/profile"}>
            <span style={{ fontWeight: "bold" }}>
              {this.props.cookies.get("auth-token").user.username}
            </span>
          </Link>
        </div>

        <div className="sidebar__stats">
          <div className="sidebar__stat">
            <p>Who viewed your profile</p>
            <p className="sidebar__statNumber">126</p>
          </div>
          <div className="sidebar__stat">
            <p>Views of your post</p>
            <p className="sidebar__statNumber">67</p>
          </div>
        </div>

        <div className="sidebar__bottom">
          <p>Recent</p>
          {this.recentItem("programming")}
          {this.recentItem("jobs")}
          {/* {this.recentItem('fintech')}
                {this.recentItem('spaceX')}
                {this.recentItem('MongoDB')} */}
          <h4>Followed Hastags</h4>
          {this.recentItem("nodejs")}
          {this.recentItem("reactjs")}
          {/* {this.recentItem('developer')}
                {this.recentItem('business')}
                {this.recentItem('tech')} */}
        </div>
      </div>
    );
  }
}

export default withCookies(Sidebar);
