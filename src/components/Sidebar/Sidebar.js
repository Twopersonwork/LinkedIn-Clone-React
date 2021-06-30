import { Avatar } from "@material-ui/core";
import { FaHashtag } from "react-icons/fa";
import "./Sidebar.css";
import { withCookies } from "react-cookie";
import { Link } from "react-router-dom";
import UserContext from "../userContext";
import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile_pic: "",
      cover_pic: "",
    };
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
          <UserContext.Consumer>
            {(props) => {
              return <img src={props.user.cover_pic} alt="background" />;
            }}
          </UserContext.Consumer>
          <UserContext.Consumer>
            {(props) => {
              return (
                <Avatar
                  src={props.user.profile_pic}
                  className="sidebar__avatar"
                ></Avatar>
              );
            }}
          </UserContext.Consumer>
          <Link to={"/profile"}>
            <span style={{ fontWeight: "bold" }}>
              {this.props.cookies.get("auth-token").user.username}
            </span>
          </Link>
        </div>

        <div className="sidebar__stats">
          <div style={{textAlign:"center",color:"gray"}}>
            <span>This is Dummy Data</span>
          </div>
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
          <div style={{textAlign:"center",color:"gray"}}>
            <span>This is Dummy Data</span>
          </div>
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
