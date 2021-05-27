import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";

import UserContext from "../userContext";

class ActivityLeft extends Component {
  constructor(props) {
    super(props);

    this.state = {
      followers: "",
      following: "",
      user: "",
    };
  }

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_API_URL}/uapi/users/${
        this.props.cookies.get("auth-token").user.id
      }/no_of_follow/`,
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

    // fetch(
    //   `${process.env.REACT_APP_API_URL}/uapi/users/${this.props.location.state}/`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-type": "application/json",
    //       Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
    //     },
    //   }
    // )
    //   .then((resp) => resp.json())
    //   .then((resp) => {
    //     this.setState({ user: resp });
    //   })
    //   .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="network_left" style={{ marginTop: "45px" }}>
        <div className="network_left__top">
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
                  className="network_left__avatar"
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

        <div className="network_left__stats">
          <div className="network_left__stat">
            <p>Followers</p>
            <p className="network_left__statNumber">{this.state.followers}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(ActivityLeft);
