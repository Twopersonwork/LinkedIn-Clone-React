import React, { Component } from "react";
import { Avatar, Button } from "@material-ui/core";
import { withCookies } from "react-cookie";
import "./Network.css";
import UserList from "./UserList";
import { Alert } from "react-bootstrap";
import { trackPromise } from "react-promise-tracker";

export class Network extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waitFollowers: [],
      user: "",
      AlertUser: "",
      Alertshow: false,
      ignore: false,
    };
  }

  submitIgnore = (e) => {
    this.setState({ AlertUser: e, ignore: true, Alertshow: true });
    fetch(`${process.env.REACT_APP_API_URL}/uapi/waitFollow/${e.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
    })
      .then((resp) => resp.json())
      .catch((error) => console.log(error));

    this.props.updateNework();
    this.getWaitFollowers();
  };

  submitAccept = (e) => {
    // console.log(e.id);
    this.setState({ AlertUser: e, Alertshow: true, ignore: false });

    fetch(`${process.env.REACT_APP_API_URL}/uapi/follow/${e.id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
    })
      .then((resp) => resp.json())
      .catch((error) => console.log(error));

    fetch(`${process.env.REACT_APP_API_URL}/uapi/waitFollow/${e.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
    })
      .then((resp) => resp.json())
      .catch((error) => console.log(error));

    this.props.updateNework();
    this.getWaitFollowers();
  };

  getWaitFollowers = () => {
    this.setState({ waitFollowers: [] });
    trackPromise(
      fetch(
        `${process.env.REACT_APP_API_URL}/uapi/users/${
          this.props.cookies.get("auth-token").user.id
        }/`,
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
          this.setState({ user: resp }, function () {
            // console.log(this.state.waitFollowers);
            if (this.state.user.waitFollowers.length > 0) {
              for (var i = 0; i < this.state.user.waitFollowers.length; i++) {
                fetch(
                  `${process.env.REACT_APP_API_URL}/uapi/userDetail/${this.state.user.waitFollowers[i].user_id}/`,
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
                    console.log(resp);
                    var joined = this.state.waitFollowers.concat([resp]);
                    this.setState({ waitFollowers: joined });
                  })
                  .catch((error) => console.log(error));
              }
            } else {
              this.setState({ waitFollowers: [] });
            }
          });
        })
    ).catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getWaitFollowers();
  }

  render() {
    console.log("render called");

    // console.log(this.state.waitFollowers);

    return (
      <div className="network">
        <div className="upper_network__inputContainer">
          <div style={{ paddingBottom: "10px" }}>
            {this.state.waitFollowers.length < 1 ? (
              <span
                style={{
                  fontWeight: "bold",
                  paddingLeft: "10px",
                }}
              >
                No pending Invitations
              </span>
            ) : (
              <div style={{ display: "flex" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    paddingLeft: "10px",
                  }}
                >
                  Invitations
                </span>
                <span
                  style={{
                    fontWeight: "bold",
                    paddingLeft: "10px",
                  }}
                  className="ml-auto"
                >
                  {this.state.waitFollowers.length}
                </span>
              </div>
            )}
          </div>
          <div style={{ marginLeft: "-5px" }}>
            <Alert
              variant="light"
              show={this.state.Alertshow}
              onClose={() => this.setState({ Alertshow: false })}
              dismissible
            >
              <div style={{ display: "flex" }}>
                {this.state.AlertUser.profile_pic ? (
                  <Avatar
                    src={this.state.AlertUser.profile_pic}
                    alt="Profile"
                  />
                ) : (
                  <Avatar src="/images/user.svg" alt="Profile" />
                )}
                {this.state.ignore ? (
                  <span
                    className="ml-2 pt-1"
                    style={{ fontSize: "18px", color: "black" }}
                  >
                    Invitation declined{" "}
                    <span style={{ fontSize: "18px", color: "#0c66c2" }}>
                      I don't know {this.state.AlertUser.username}
                    </span>
                  </span>
                ) : (
                  <span
                    className="ml-2 pt-1"
                    style={{ fontSize: "18px", color: "black" }}
                  >
                    {this.state.AlertUser.username} is now a connection
                  </span>
                )}
              </div>
            </Alert>
          </div>
          <div className="mt-4">
            {this.state.waitFollowers.length > 0 &&
              this.state.waitFollowers.map((user) => (
                <div className="user">
                  <div className="user__header" style={{ display: "flex" }}>
                    <Avatar src={user.profile_pic} alt="Profile" />

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
