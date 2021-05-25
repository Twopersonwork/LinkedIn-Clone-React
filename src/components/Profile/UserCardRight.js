import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MdDone } from "react-icons/md";
import { Avatar, Button } from "@material-ui/core";
import { withCookies } from "react-cookie";

class UserCardRight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pending: false,
    };
  }

  submitFollow = (e) => {
    // console.log(e);
    fetch(`${process.env.REACT_APP_API_URL}/uapi/follow/${e}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
    })
      .then((resp) => {
        resp.json();
        this.setState({ pending: true });
      })
      .catch((error) => console.log(error));

    fetch(`${process.env.REACT_APP_API_URL}/uapi/waitFollow/${e}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
    })
      .then((resp) => resp.json())
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="profile_right__article">
        <div className="profile_right__articleLeft">
          <Avatar
            style={{ width: "60px", height: "60px" }}
            src={this.props.user.profile_pic}
            alt="Profile"
          />
        </div>

        <div className="profile_right__articleRight">
          <Link to={{ pathname: "user_profile", state: this.props.user.id }}>
            <span
              style={{
                fontWeight: "bold",
                color: "black",
                fontSize: "18px",
              }}
            >
              {this.props.user.username.length <= 10
                ? this.props.user.username
                : this.props.user.username.slice(0, 10) + ".."}
            </span>
          </Link>
          {this.state.pending ? (
            <Button
              onClick={() => this.submitFollow(this.props.user.id)}
              className="mt-2"
              style={pending_button}
              size="small"
            >
              <MdDone style={{ fontSize: "20px", marginRight: "2px" }} />{" "}
              Pending
            </Button>
          ) : (
            <Button
              onClick={() => this.submitFollow(this.props.user.id)}
              className="mt-2"
              size="small"
              style={connect_button}
            >
              Connect
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const connect_button = {
  fontWeight: "bold",
  borderRadius: "50px",
  fontSize: "15px",
  display: "flex",
  background: "white",
  color: "grey",
  border: "solid 1px grey",
  maxWidth: "100%",
  cursor: "pointer",
  minWidth: "40%",
};
const pending_button = {
  fontWeight: "bold",
  borderRadius: "50px",
  fontSize: "15px",
  display: "flex",
  background: "white",
  color: "gray",
  border: "solid 1px gray",
  maxWidth: "100%",
  cursor: "pointer",
  minWidth: "40%",
};

export default withCookies(UserCardRight);
