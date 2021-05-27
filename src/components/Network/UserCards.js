import React, { Component } from "react";
import { Avatar, Button } from "@material-ui/core";
import { withCookies } from "react-cookie";
import "./UserCards.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  button: {
    textTransform: "none",
    marginTop: "20px",
  },
});

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
    fetch(
      `${process.env.REACT_APP_API_URL}/uapi/follow/${this.props.user.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log(resp);
        this.setState({ pending: true });
      })
      .catch((error) => console.log(error));

    fetch(
      `${process.env.REACT_APP_API_URL}/uapi/waitFollow/${this.props.user.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };

  render() {
    const { classes } = this.props;
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
                  className={classes.button}
                  style={pending_button}
                >
                  <MdDone style={{ fontSize: "20px", marginRight: "2px" }} />{" "}
                  <span style={{ fontWeight: "bold" }}>Pending</span>
                </Button>
              ) : (
                <Button
                  onClick={this.submitFollow}
                  className={classes.button}
                  style={connect_button}
                >
                  <span style={{ fontWeight: "bold" }}>Connect</span>
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
  width: "77%",
  borderRadius: "50px",
  fontSize: "16px",
  display: "flex",
  background: "white",
  color: "#0c66c2",
  border: "solid 1px #0c66c2",
  cursor: "pointer",
  padding: "0px 12px 2px 12px",
  marginBottom: "10px",
};

const pending_button = {
  width: "77%",
  borderRadius: "50px",
  fontSize: "16px",
  display: "flex",
  background: "white",
  color: "grey",
  border: "solid 1px grey",
  cursor: "pointer",
  padding: "0px 12px 2px 12px",
  marginBottom: "10px",
};

export default withStyles(styles, { withTheme: true })(withCookies(UserCards));
