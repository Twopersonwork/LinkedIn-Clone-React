import React, { Component } from "react";
import "./Login.css";
import { Container, Row } from "react-bootstrap";
import { Typography, Button, Card, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        // this is for store the user credentials like username and password
        username: "",
        password: "",
      },
      emailError: "",
      passwordError: "",
    };
  }

  inputChanged = (event) => {
    console.log(event.target.value);
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  };

  login = (e) => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state.credentials),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.token) {
          this.props.cookies.set("auth-token", resp);
          console.log(resp.user.user_profile);
          if (resp.user.user_profile) {
            this.props.cookies.set("profile", true);
            this.props.cookies.set("profile-id", resp.user.user_profile.id);
          } else {
            this.props.cookies.set("profile", false);
          }
          window.location.href = "/main";
        } else if (resp.user_not_found) {
          this.setState({ emailError: resp.user_not_found });
        } else if (resp.chk_uname_or_pwd) {
          this.setState({ passwordError: resp.chk_uname_or_pwd });
        }
      })
      .catch((error) => console.log(error));

    e.preventDefault();
  };

  render() {
    return (
      <Container>
        <Row>
          <img
            className="linkedin-img-login"
            src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Logo.wine.svg"
            alt="linkedin logo"
          />
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-80px",
            paddingBottom: "10%",
          }}
        >
          <Card
            className="p-3 shadow p-3 mb-5 bg-white rounded"
            style={{ width: "20rem" }}
          >
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Sign in
            </Typography>
            <span style={{ fontSize: "17px" }}>
              Stay updated on your professional world
            </span>
            <form className="m-1" onSubmit={this.login}>
              <TextField
                error={this.state.emailError ? true : false}
                helperText={this.state.emailError}
                variant="outlined"
                type="email"
                fullWidth
                id="username"
                value={this.state.credentials.username}
                label="Email"
                name="username"
                onChange={this.inputChanged}
                required
                className="mt-3 mb-3"
              />

              <TextField
                error={this.state.passwordError ? true : false}
                helperText={this.state.passwordError}
                variant="outlined"
                type="password"
                fullWidth
                id="password"
                value={this.state.credentials.password}
                label="Password"
                name="password"
                onChange={this.inputChanged}
                required
                className="mb-3"
              />
              <Link to={"/forget_password"}>
                <span style={{ color: "#0c66c2" }}>Forget password ?</span>
              </Link>
              <Button
                type="submit"
                variant="contained"
                size="large"
                style={{
                  borderRadius: "50px",
                  background: "#0c66c2",
                  color: "#FFFFFF",
                  minWidth: "100%",
                  marginTop: "10px",
                }}
              >
                Sign In
              </Button>
            </form>
          </Card>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-140px",
          }}
        >
          <Typography align="center" className="mt-3">
            New to LinkedIn?
            <Link to={"/join_now"}>
              <span
                className="ml-1"
                style={{ color: "#0c66c2", fontWeight: "bold" }}
              >
                Join Now
              </span>
            </Link>
          </Typography>
        </Row>
      </Container>
    );
  }
}

export default withCookies(Login);
