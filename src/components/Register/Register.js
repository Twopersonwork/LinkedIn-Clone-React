import "./Register.css";
import React, { Component } from "react";
import { Container, Form, Row, Card } from "react-bootstrap";
import { Typography, Button, TextField } from "@material-ui/core";
import logo from "./google.png";
import { Link, Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        // user credentials
        username: "",
        email: "",
        password: "",
        password2: "",
      },
      responseMsg: "",
      emailError: "",
      usernameError: "",
      passwordError: "",
    };
  }

  inputChanged = (event) => {
    // console.log(event.target.value);
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  };

  register = (event) => {
    fetch(`${process.env.REACT_APP_API_URL}/uapi/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.credentials),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        if (resp.response) {
          this.setState({ responseMsg: resp.response });
        } else if (resp.email) {
          this.setState({ emailError: resp.email });
        } else if (resp.password) {
          this.setState({ passwordError: resp.password });
        }
      })
      .catch((error) => console.log(error));

    event.preventDefault();
  };

  render() {
    return (
      <Container fluid style={{ backgroundColor: "#f3f2ef" }}>
        <Row>
          <img
            className="linkedin-img-reg rounded mx-auto d-block"
            src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Logo.wine.svg"
            alt="linkedin logo"
          />
        </Row>
        <Typography align="center" variant="h4" style={{ marginTop: "-80px" }}>
          Make the most of your professional life
        </Typography>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
            paddingBottom: "10%",
          }}
        >
          <Card className="p-3" style={{ width: "20rem" }}>
            <Form onSubmit={this.register}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                type="text"
                id="username"
                label="Full Name"
                name="username"
                autoComplete="username"
                onChange={this.inputChanged}
                className="mt-2 mb-3"
              />

              <TextField
                error={this.state.emailError ? true : false}
                helperText={this.state.emailError}
                size="small"
                variant="outlined"
                required
                fullWidth
                type="email"
                id="email"
                label="Email id"
                name="email"
                autoComplete="email"
                onChange={this.inputChanged}
                className="mt-2 mb-3"
              />
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.inputChanged}
                className="mt-2 mb-3"
              />
              <TextField
                error={this.state.passwordError ? true : false}
                helperText={this.state.passwordError}
                size="small"
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={this.inputChanged}
                className="mt-2 mb-3"
              />
              <Button
                variant="contained"
                type="submit"
                style={{
                  borderRadius: "50px",
                  background: "#0c66c2",
                  color: "#FFFFFF",
                  minWidth: "100%",
                }}
              >
                Agree & Join
              </Button>
              {/* <span className="hr-sect" style={{ color: "#000" }}>
                or
              </span> */}
              {/* <Button
                variant="contained"
                style={{
                  borderRadius: "50px",
                  background: "#FFFFFF",
                  color: "#0c66c2",
                  minWidth: "100%",
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                <img src={logo} className="pr-3" alt="google icon" />
                Join with Google
              </Button> */}
            </Form>
            <Typography align="center" className="mt-3">
              Already on LinkedIn?
              <Link to={"/login"}>
                <span
                  className="ml-1"
                  style={{ color: "#0c66c2", fontWeight: "bold" }}
                >
                  Sign In
                </span>
              </Link>
            </Typography>
          </Card>
        </Row>

        {this.state.responseMsg ? (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        ) : null}
      </Container>
    );
  }
}

export default Login;
