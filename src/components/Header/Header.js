// import "./Header.css";
// import HeaderOption from "./HeaderOption";
// import SearchIcon from "@material-ui/icons/Search";
// import HomeIcon from "@material-ui/icons/Home";
// import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
// import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
// import ChatIcon from "@material-ui/icons/Chat";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import { withCookies } from "react-cookie";
import { Link } from "react-router-dom";
import styled from "styled-components";

import React, { Component } from "react";

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
    // console.log(
    //   window.location.href.split("/")[
    //     window.location.href.split("/").length - 1
    //   ]
    // );
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
              <NavList
                className={
                  window.location.pathname.slice(1) == "" ? "active" : null
                }
              >
                <Link to={"/"}>
                  <img
                    onClick={this.thisClicked}
                    src="/images/nav-home.svg"
                    alt=""
                  />
                  <span onClick={this.thisClicked}>Home</span>
                </Link>
              </NavList>

              <NavList
                className={
                  window.location.pathname.slice(1) == "network"
                    ? "active"
                    : null
                }
              >
                <Link to={"/network"}>
                  <img
                    onClick={this.thisClicked}
                    src="/images/nav-network.svg"
                    alt=""
                  />
                  <span onClick={this.thisClicked}>My Network</span>
                </Link>
              </NavList>

              <NavList
                className={
                  window.location.pathname.slice(1) == "/#" ? "active" : null
                }
              >
                <Link to={"/"}>
                  <img src="/images/nav-jobs.svg" alt="" />
                  <span onClick={this.thisClicked}>Jobs</span>
                </Link>
              </NavList>

              <NavList
                className={
                  window.location.pathname.slice(1) == "/#" ? "active" : null
                }
              >
                <Link to={"/"}>
                  <img src="/images/nav-messaging.svg" alt="" />
                  <span>Messaging</span>
                </Link>
              </NavList>

              <NavList
                className={
                  window.location.pathname.slice(1) == "/#" ? "active" : null
                }
              >
                <Link to={"/"}>
                  <img src="/images/nav-notifications.svg" alt="" />
                  <span>Notifications</span>
                </Link>
              </NavList>

              <User
                className={
                  window.location.pathname.slice(1) == "profile"
                    ? "active"
                    : null
                }
              >
                <Link to={"/"}>
                  <img src="/images/user.svg" alt="" />
                  <span>Me</span>
                  {/* <img src="/images/down-icon.svg" alt="" /> */}
                </Link>

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
      // <div className="header">
      //   <div className="header__left">
      //       <img
      //         src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg"
      //         alt="linkedin logo"
      //         onClick={() => window.location.href="/"}
      //       />

      //     <div className="header__search">
      //       <SearchIcon style={{ color: "black" }} />
      //       <input type="text" placeholder="Search" />
      //     </div>
      //   </div>

      //   <div className="header__right">
      //     <HeaderOption Icon={HomeIcon} title="Home" />
      //     <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
      //     <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
      //     <HeaderOption Icon={ChatIcon} title="Messaging" />
      //     <HeaderOption Icon={NotificationsIcon} title="Notifications" />
      //     <Link to={"/"}>
      //       <HeaderOption
      //         avatar={true}
      //         title="Log Out"
      //         onClick={this.removeallCookies}
      //       />
      //     </Link>
      //   </div>
      // </div>
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
  padding-top: 3px;
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
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
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
  top: 45px;
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

export default withCookies(Header);
