import React, { Component } from "react";
import { Avatar, Button } from "@material-ui/core";
import { withCookies } from "react-cookie";
import "./UserCards.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDone } from "react-icons/md";

export class UserCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pending: false,
      show: true,
    };
  }
  removeImage = () => {
    this.setState({ show: false });
  };
  submitFollow = () => {
    fetch(`http://127.0.0.1:8000/uapi/follow/${this.props.user.id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        this.setState({ pending: true });
      })
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
    if (this.state.show) {
      return (
        <div className="breakpoint">
          <Card style={{ padding: "5px", border: "white" }}>
            <div className="list__top">
              <img src={this.props.user.cover_pic} alt="background" />
              <AiFillCloseCircle
                className="over__image"
                onClick={this.removeImage}
              />
              {/* <Icon  /> */}

              <Avatar
                style={{ width: "80px", height: "80px" }}
                src={this.props.user.profile_pic}
                alt="Profile"
              />

              <Link
                to={{ pathname: "user_profile", state: this.props.user.id }}
              >
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
                  onClick={this.submitFollow}
                  className="but mt-3"
                  style={pending_button}
                >
                  <MdDone style={{ fontSize: "20px", marginRight: "2px" }} />{" "}
                  Pending
                </Button>
              ) : (
                <Button
                  onClick={this.submitFollow}
                  className="but mt-3"
                  style={connect_button}
                >
                  Connect
                </Button>
              )}
            </div>
          </Card>
        </div>
      );
    } else {
      return null;
    }
  }
}
const connect_button = {
  fontWeight: "bold",
  borderRadius: "50px",
  fontSize: "12px",
  display: "flex",
  background: "white",
  color: "#0c66c2",
  border: "solid 1px #0c66c2",
  maxWidth: "100%",
  cursor: "pointer",
};
const pending_button = {
  fontWeight: "bold",
  borderRadius: "50px",
  fontSize: "12px",
  display: "flex",
  background: "white",
  color: "gray",
  border: "solid 1px gray",
  maxWidth: "100%",
  cursor: "pointer",
};

export default withCookies(UserCards);
