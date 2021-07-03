import React, { Component } from "react";
import "./ProfileRight.css";
import UserContext from "../userContext";
import { withCookies } from "react-cookie";
import FlipMove from "react-flip-move";

import UserCardRight from "./UserCardRight";

class ProfileRight extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      resp_user: [],
      users: [],
    };
  }

  componentDidMount() {
    const user = this.context;
    fetch(`${process.env.REACT_APP_API_URL}/uapi/userDetail/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState({ resp_user: resp }, function () {
          var copy = [];
          if (user.user.followers && user.user.following) {
            for (var i = 0; i < this.state.resp_user.length; i++) {
              if (
                user.user.id !== this.state.resp_user[i].id &&
                !user.user.followers.some(
                  (e) => e.user_id === this.state.resp_user[i].id
                ) &&
                !user.user.following.some(
                  (e) => e.following_user_id === this.state.resp_user[i].id
                )
                // &&
                // !user.waitFollowers.some(
                //   (e) => e.user_id === this.state.resp_user[i].id
                // )
              ) {
                copy.push(this.state.resp_user[i]);
              }
            }
          }
          this.setState({ users: copy });
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="profile_right">
        <div className="profile_right__header">
          <span className="pl-1">People you may know</span>
        </div>
        {this.state.users
          ? this.state.users.map((user) => (
              <FlipMove>
                <UserCardRight key={user.id} user={user} />
              </FlipMove>
            ))
          : null}
      </div>
    );
  }
}

export default withCookies(ProfileRight);
