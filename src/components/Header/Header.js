import { withCookies } from "react-cookie";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import UserContext from "../userContext";
import "./Header.css";

const styles = (theme) => ({
  customBadge: {
    backgroundColor: "rgb(205, 64, 30)",
    color: "white",
    fontFamily:
      "-apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto,Helvetica Neue, Fira Sans, Ubuntu, Oxygen, Oxygen Sans, Cantarell,Droid Sans, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,Lucida Grande, Helvetica, Arial, sans-serif",
    fontWeight: "bold",
  },
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeHome: true,
      activeNetwork: false,
      loc: "",
    };
  }

  removeallCookies = () => {
    this.props.cookies.remove("auth-token");
    this.props.cookies.remove("profile");
    this.props.cookies.remove("profile-id");
    this.props.cookies.remove("about-id");
    this.props.cookies.remove("education-id");
    this.props.cookies.remove("license-id");
  };

  thisClicked = () => {
    console.log(window.location.pathname);

    console.log(window.location.href.split("/"));
    this.setState({
      loc: window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ],
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container style={{ position: "fixed" }}>
        <Content>
          <Logo>
            <a href="/">
              <img src="/images/home-logo.svg" alt="" />
            </a>
          </Logo>
          <Search>
            <div>
              <input type="text" placeholder="Search" />
            </div>
            <SearchIcon>
              <img src="/images/search-icon.svg" alt="" />
            </SearchIcon>
          </Search>
          <Nav>
            <NavListWrap>
              <NavList>
                <Link onClick={this.thisClicked} to={"/"}>
                  {window.location.pathname.slice(1) == "" ? (
                    <svg
                      onClick={this.thisClicked}
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                    >
                      <path d="m23 9v2h-2v7c0 1.7-1.3 3-3 3h-4v-6h-4v6h-4c-1.7 0-3-1.3-3-3v-7h-2v-2l11-7z"></path>
                      <path d="m20 2h-3v3.2l3 1.9z"></path>
                    </svg>
                  ) : (
                    <svg
                      onClick={this.thisClicked}
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                      fill="rgba(0,0,0,0.6)"
                    >
                      <path d="m23 9v2h-2v7c0 1.7-1.3 3-3 3h-4v-6h-4v6h-4c-1.7 0-3-1.3-3-3v-7h-2v-2l11-7z"></path>
                      <path d="m20 2h-3v3.2l3 1.9z"></path>
                    </svg>
                  )}

                  <NavList
                    className={
                      window.location.pathname.slice(1) == "" ? "active" : null
                    }
                  >
                    {/* <img
                    onClick={this.thisClicked}
                    src="/images/nav-home.svg"
                    alt=""
                  /> */}

                    <span onClick={this.thisClicked}>Home</span>
                  </NavList>
                </Link>
              </NavList>

              <NavList>
                <UserContext.Consumer>
                  {(props) => (
                    <Badge
                      classes={{ badge: classes.customBadge }}
                      style={{
                        paddingLeft: "20px",
                        bottom: "20px",
                        left: "55px",
                      }}
                      badgeContent={
                        props.user.waitFollowers
                          ? props.user.waitFollowers.length
                          : 0
                      }
                    >
                      {/* <span class="badge badge-pill yellow blue-text">0</span> */}
                    </Badge>
                  )}
                </UserContext.Consumer>
                <Link onClick={this.thisClicked} to={"/network"}>
                  {window.location.pathname.slice(1) == "network" ? (
                    <svg
                      onClick={this.thisClicked}
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                    >
                      <path d="m12 16v6h-9v-6c0-1.7 1.3-3 3-3h3c1.7 0 3 1.3 3 3zm5.5-3c1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5-3.5 1.6-3.5 3.5 1.6 3.5 3.5 3.5zm1 2h-2c-1.4 0-2.5 1.1-2.5 2.5v4.5h7v-4.5c0-1.4-1.1-2.5-2.5-2.5zm-11-13c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5z"></path>
                    </svg>
                  ) : (
                    <svg
                      onClick={this.thisClicked}
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                      fill="rgba(0,0,0,0.6)"
                    >
                      <path d="m12 16v6h-9v-6c0-1.7 1.3-3 3-3h3c1.7 0 3 1.3 3 3zm5.5-3c1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5-3.5 1.6-3.5 3.5 1.6 3.5 3.5 3.5zm1 2h-2c-1.4 0-2.5 1.1-2.5 2.5v4.5h7v-4.5c0-1.4-1.1-2.5-2.5-2.5zm-11-13c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5z"></path>
                    </svg>
                  )}

                  <span onClick={this.thisClicked}>My Network</span>
                </Link>
              </NavList>

              <NavList
              // className={
              //   window.location.pathname.slice(1) == "/#" ? "active" : null
              // }
              >
                <Link onClick={(event) => event.preventDefault()}>
                  <img src="/images/nav-jobs.svg" alt="" />
                  <span onClick={this.thisClicked}>Jobs</span>
                </Link>
              </NavList>

              <NavList
              // className={
              //   window.location.pathname.slice(1) == "/#" ? "active" : null
              // }
              >
                <Link onClick={(event) => event.preventDefault()}>
                  <img src="/images/nav-messaging.svg" alt="" />
                  <span>Messaging</span>
                </Link>
              </NavList>

              <NavList
              // className={
              //   window.location.pathname.slice(1) == "/#" ? "active" : null
              // }
              >
                <Link onClick={(event) => event.preventDefault()}>
                  <img src="/images/nav-notifications.svg" alt="" />
                  <span>Notifications</span>
                </Link>
              </NavList>
              <User>
                <NavList
                  className={
                    window.location.pathname.slice(1) == "profile"
                      ? "active"
                      : null
                  }
                >
                  {window.location.pathname.slice(1) == "profile" ? (
                    <Link onClick={(event) => event.preventDefault()}>
                      <UserContext.Consumer>
                        {(props) => {
                          return (
                            <img
                              onClick={this.thisClicked}
                              src={props.user.profile_pic}
                              alt=""
                            />
                          );
                        }}
                      </UserContext.Consumer>
                      <span>Me</span>

                      {/* <img src="/images/down-icon.svg" alt="" /> */}
                    </Link>
                  ) : (
                    <Link onClick={this.thisClicked} to={"/profile"}>
                      <UserContext.Consumer>
                        {(props) => {
                          return (
                            <img
                              onClick={this.thisClicked}
                              src={props.user.profile_pic}
                              alt=""
                            />
                          );
                        }}
                      </UserContext.Consumer>
                      <span>Me</span>

                      {/* <img src="/images/down-icon.svg" alt="" /> */}
                    </Link>
                  )}
                </NavList>
                <SignOut>
                  <Link to={"/home"} onClick={this.removeallCookies}>
                    Sign Out
                  </Link>
                </SignOut>
              </User>
              <Work>
                <Link to={"/"}>
                  <img src="/images/nav-work.svg" alt="" />
                  <span>
                    Work
                    <img src="/images/down-icon.svg" alt="" />
                  </span>
                </Link>
              </Work>
            </NavListWrap>
          </Nav>
        </Content>
      </Container>
    );
  }
}

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  // position: sticky;
  top: 0;
  width: 100vw;
  z-index: 100;
  padding-top: 8px;
  padding-bottom: 2px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1190px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
  margin-top: -10px;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  margin-top: -10px;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 270px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  margin-bottom: -20px;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 60px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
`;

const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }
  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

export default withStyles(styles, { withTheme: true })(withCookies(Header));
