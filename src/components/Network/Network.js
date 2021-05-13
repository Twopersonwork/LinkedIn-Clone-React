import React, { Component } from "react";
import { Avatar, Button } from "@material-ui/core";
import { withCookies } from "react-cookie";
import "./Network.css";
import UserList from "./UserList";

export class Network extends Component {
  constructor(props) {
    super(props);

    this.state = { waitFollowers: [], user: "" };
  }

  submitIgnore = (e) => {
    fetch(`http://127.0.0.1:8000/uapi/waitFollow/${e.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };

  submitAccept = (e) => {
    console.log(e.id);

    fetch(`http://127.0.0.1:8000/uapi/follow/${e.id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));

    fetch(`http://127.0.0.1:8000/uapi/waitFollow/${e.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    console.log("comp called");
    fetch(
      `http://127.0.0.1:8000/uapi/users/${
        this.props.cookies.get("auth-token").user.id
      }/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState({ user: resp }, function () {
          // console.log(this.state.waitFollowers);
          if (this.state.user.waitFollowers.length > 0) {
            for (var i = 0; i < this.state.user.waitFollowers.length; i++) {
              fetch(
                `http://127.0.0.1:8000/uapi/userDetail/${this.state.user.waitFollowers[i].user_id}/`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${
                      this.props.cookies.get("auth-token").token
                    }`,
                  },
                }
              )
                .then((resp) => resp.json())
                .then((resp) => {
                  //   console.log(resp.profile_pic);
                  var joined = this.state.waitFollowers.concat([resp]);
                  this.setState({ waitFollowers: joined });
                })
                .catch((error) => console.log(error));
            }
          }
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log("render called");

    // console.log(this.state.waitFollowers);

    return (
      <div className="network">
        <div className="network__inputContainer">
          <div>
            <span
              style={{
                fontWeight: "bold",
                paddingLeft: "10px",
              }}
            >
              Invitations
            </span>
          </div>
          <div className="mt-4">
            {this.state.waitFollowers.length > 0 &&
              this.state.waitFollowers.map((user) => (
                <div className="user">
                  <div className="user__header" style={{ display: "flex" }}>
                    {user.profile_pic ? (
                      <Avatar
                        src="http://127.0.0.1:8000/media/profile_images/user.svg"
                        alt="Profile"
                      />
                    ) : (
                      <Avatar src="/images/user.svg" alt="Profile" />
                    )}
                    <span className="ml-2 " style={{ fontWeight: "bold" }}>
                      {user.username}
                    </span>

                    <Button
                      onClick={() => this.submitIgnore(user)}
                      className="ml-auto"
                    >
                      Ignore
                    </Button>
                    <Button
                      onClick={() => this.submitAccept(user)}
                      className="ml-2"
                      style={save_button}
                    >
                      Accept
                    </Button>
                  </div>
                  <hr />
                </div>
              ))}
          </div>
        </div>
        <hr />
        {this.state.user
          ? (console.log("wait foloo", this.state.waitFollowers),
            (
              <UserList
                followers={this.state.user.followers}
                following={this.state.user.following}
                waitFollowers={this.state.user.waitFollowers}
                user={this.state.user}
              />
            ))
          : null}
      </div>
    );
  }
}
const save_button = {
  paddingLeft: "20px",
  paddingRight: "20px",
  //   marginTop: "10px",
  marginLeft: "10px",
  fontWeight: "bold",
  borderRadius: "50px",
  fontSize: "14px",
  display: "flex",
  background: "white",
  color: "#0c66c2",
  border: "solid 1px #0c66c2",
  width: "80px",
  height: "40px",
};

export default withCookies(Network);
