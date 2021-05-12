import React, { Component } from "react";
import { Avatar, Button } from "@material-ui/core";
import { withCookies } from "react-cookie";

export class UserCards extends Component {
  submitFollow = () => {
    fetch(`http://127.0.0.1:8000/uapi/follow/${this.props.user.id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));

    fetch(`http://127.0.0.1:8000/uapi/waitFollow/${this.props.user.id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };
  render() {
    // console.log("props user", this.props.user);
    return (
      <div>
        <div className="user">
          <div className="user__header" style={{ display: "flex" }}>
            {this.props.user.profile_pic ? (
              <Avatar
                src="http://127.0.0.1:8000/media/profile_images/user.svg"
                alt="Profile"
              />
            ) : (
              <Avatar src="/images/user.svg" alt="Profile" />
            )}
            <span className="ml-2 " style={{ fontWeight: "bold" }}>
              {this.props.user.username}
            </span>

            <Button
              onClick={this.submitFollow}
              className="ml-2"
              style={save_button}
            >
              Connect
            </Button>
          </div>
          <hr />
        </div>
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
export default withCookies(UserCards);
