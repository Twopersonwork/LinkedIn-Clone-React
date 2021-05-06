import { Avatar } from "@material-ui/core";
import { FaHashtag } from "react-icons/fa";
import "./Sidebar.css";
import { withCookies } from "react-cookie";
import { Link} from "react-router-dom";


import React, { Component } from "react";

class Sidebar extends Component {
  componentDidMount() {
    console.log(this.props.cookies.get("username"));
    // fetch("http://127.0.0.1:8000/auth/", {
    //     method:"POST",
    //     headers : {
    //         "Content-Type":"application/json",
    //         "Authorization":"Token 4bd66226919d32a577ff458b35244cc034d4f586",
    //     },
    // }).then((resp) => resp.json())
    // .then((res) => console.log(res))
    // .catch((error) => console.log(error))
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
          <Avatar
            src="https://static.hollywoodreporter.com/sites/default/files/2019/03/avatar-publicity_still-h_2019-compressed.jpg"
            className="sidebar__avatar"
          ></Avatar>
          <Link to={'/profile'}>
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
