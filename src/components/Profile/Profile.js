import React, { Component } from "react";
import "./Profile.css";
import { Avatar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { Button as Btn } from "react-bootstrap";
import EditIntroModal from "./EditIntroModal";
import { withCookies } from "react-cookie";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileModalShow: false,
      profileCredentials: {},
    };
  }

  onProfileModal = () => {
    this.setState({ profileModalShow: true });
  };

  updateProfile = () => {
    console.log("This is update profiel");
    fetch(
      `${
        process.env.REACT_APP_API_URL
      }/profile/user_profile/${this.props.cookies.get("profile-id")}/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState({ profileCredentials: resp });
        this.setState({ profileModalShow: false });

      })
      .catch((error) => console.log(error));
  };

  componentDidMount = () => {
    this.updateProfile();
  };

  render() {
    return (
      <div className="profile">
        <div className="profile__top">
          <img
            src="https://resi.ze-robot.com/dl/4k/4k-desktop-wallpaper.-1920%C3%971200.jpg"
            alt="background"
          />
          <Avatar
            src="https://static.hollywoodreporter.com/sites/default/files/2019/03/avatar-publicity_still-h_2019-compressed.jpg"
            className="sidebar__avatar"
          ></Avatar>
          {/* Create model for user,for add the profile info. */}
          <Btn
            className="ml-auto mr-4"
            style={{
              display: "block",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              background: "grey",
              marginTop:"-40px"
            }}
            onClick={this.onProfileModal}
          >
            <FaEdit />
          </Btn>

          {/* For get User information */}
          {this.state.profileModalShow ? (
            <Link
              component={() => (
                <EditIntroModal updateProfile={() => this.updateProfile()} />
              )}
            />
          ) : null}

          <div className="profile__stats" style={{ marginTop: "-10px" }}>
            <div className="profile__stat">
              <h4>
                {this.state.profileCredentials.firstName
                  ? this.state.profileCredentials.firstName
                  : `${this.props.cookies.get("auth-token").user.username}`}
                {/* {!this.state.profileCredentials.firstName ?  : null}{" "} */}{" "}
                {this.state.profileCredentials.lastName}
              </h4>
            </div>
            <Typography className="profile__stat">
              {this.state.profileCredentials.headLine}
            </Typography>
            <Typography className="profile__stat">
              {this.state.profileCredentials.location}{" "}
              {this.state.profileCredentials.country}
              <Typography className="profile__stat_connections">
                +500 Connections
              </Typography>
            </Typography>

            <Link
              className="profile__stat_connections mt-2"
              to={"/contact-info"}
            >
              Contact info
            </Link>

            <div className="profile__stat">
              <Button style={profile_button}>Open To</Button>

              <Button style={profile_button}>Add profile section</Button>
              <Button style={profile_button}>More</Button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="profile__about mt-3">
          <div className="profile__about_header d-flex justify-content-between">
            <h4>About</h4>
            <Btn
              style={{
                display: "block",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                background: "grey",
              }}
            >
              <FaEdit onClick={() => console.log("1")}></FaEdit>
            </Btn>
          </div>
          <p className="profile__stat_about">
            I'm currently pursuing my bachelor's degree in computer science. I
            like to code. I know languages like Python, Java, frameworks like
            Django, flask, and libraries like React.js. I also know Machine
            learning, Deep Learning, and Natural Language Processing(NLP). I
            like to solve challenging problems. I want to solve some real-world
            problems.
          </p>
        </div>

        {/* DashBoard*/}
        <div className="profile__dashboard">
          <h4 className="profile__dashboard_header d-flex justify-content-between">
            Your Dashboard
          </h4>
          <span
            className="profile__dashboard_header d-flex justify-content-between"
            style={{
              marginTop: "-20px",
              fontStyle: "italic",
              color: "#707070	",
            }}
          >
            Private to you
          </span>

          <div className="profile__dashboard_card_1">
            71 who viewd your profile
          </div>
          <div className="profile__dashboard_card_2">1388 post view</div>
        </div>

        {/*  Activity */}

        <div className="profile__activity">
          <div className="profile__activity_header d-flex justify-content-between">
            <h4>Activity</h4>
            <Button size="small" style={{ marginTop: "-20px" }}>
              Start Post
            </Button>
          </div>
          <div>
            <Link to={"/followers"}>
              <span
                className="profile__activity_followers"
                style={{ marginTop: "-20px", marginBottom: "10px" }}
              >
                916 followers
              </span>
            </Link>
          </div>
          <div>
            <span
              style={{
                fontSize: "19px",
                paddingRight: "25px",
              }}
            >
              Posts you created, shared, or commented on in the last 90 days are
              displayed here.
            </span>
          </div>
          <div>
            <Button className="mt-3 p-2" style={{ width: "100%" }}>
              See all Activity
            </Button>
          </div>
        </div>

        {/* Education and License & certifications */}
        <div className="profile__education_certificate">
          {/* Education */}
          <div className="profile__education_certificate_header d-flex justify-content-between">
            <h4>Education</h4>
            <BiPlus style={{ fontSize: "30px" }} />
          </div>
          {/* License & Certificate */}
          <hr />
          <div className="profile__education_certificate_header d-flex justify-content-between">
            <h4>Licenses & certifications</h4>
            <BiPlus style={{ fontSize: "30px" }} />
          </div>
        </div>

        {/* Skills & endorsements */}
        <div className="profile__skills">
          <div className="profile__skills_header d-flex bd-highlight">
            <h4 className="mr-auto">Skills & Endorsements</h4>
            <Button
              className="mr-left"
              size="small"
              style={{ marginTop: "-20px", marginRight: "20px" }}
            >
              Add a new skill
            </Button>
            <Btn
              style={{
                display: "block",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                background: "grey",
              }}
            >
              <FaEdit onClick={() => console.log("1")}></FaEdit>
            </Btn>
          </div>
        </div>
      </div>
    );
  }
}

const profile_button = {
  paddingLeft: "20px",
  paddingRight: "20px",
  marginTop: "10px",
  marginLeft: "10px",
  fontWeight: "bold",
  borderRadius: "50px",
  display: "flex",
  color: "#0c66c2",
  border: "solid 1px #0c66c2",
};

export default withCookies(Profile);
