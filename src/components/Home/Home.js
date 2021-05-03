import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <Container>
        <div className="navbar">
          <div>
            <img
              className="linkedin-img"
              src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Logo.wine.svg"
              alt="linkedin logo"
            />
          </div>

          <div>
            <Link to={'/join_now'}>
              <Button
                variant="contained"
                style={{
                  borderRadius: "50px",
                  background: "#FFFFFF",
                  color: "#0c66c2",
                  marginTop: "-100px",
                }}
              >
                Join Now
              </Button>
            </Link>
            <Link to={'/login'}>
              <Button
                style={{
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  background: "#FFFFFF",
                  color: "#0c66c2",
                  marginTop: "-100px",
                  marginLeft: "12px",
                  border: "solid 1px #0c66c2",
                }}
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }
}

export default Home;
