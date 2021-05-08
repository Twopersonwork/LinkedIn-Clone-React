import React, { Component } from "react";
import "./Profile.css";
import { Avatar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { BiPlus, BiEdit } from "react-icons/bi";
import EditIntroModal from "./EditIntroModal";
import { withCookies } from "react-cookie";
import About from "./About";
import Education from "./Education";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileModalShow: false, // for display modal for user info.
      profileCredentials: {}, // user credentials
      no_of_followers: "", // store the user followers.

      aboutModalShow: false, // for display modal for user about.
      AboutCredentials: {}, // about credentiaks.

      educationModalShow: false, // for display modal for user education.
      EducationCredentials: [], // education credentials
      createEducation: false,
      editEducation_id: "",
    };
  }

  // for change the value of profileModalShow
  onProfileModal = (e) => {
    console.log("this is profileModalShow");
    this.setState({ profileModalShow: e });
    this.setState({ aboutModalShow: false });
    this.setState({ educationModalShow: false });
  };

  // for change the value of aboutModalShow
  onAboutModal = (e) => {
    console.log("this is aboutModalShow");
    this.setState({ aboutModalShow: e });
    this.setState({ profileModalShow: false });
    this.setState({ educationModalShow: false });
  };

  // for change the value if educationModalShow
  onEducationModal = (e) => {
    console.log("this is educationModalShow");
    this.setState({ educationModalShow: e });
    this.setState({ profileModalShow: false });
    this.setState({ aboutModalShow: false });

    this.setState({ createEducation: true });
  };

  // for update the user credentials.
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

  // for get the user followers
  getUserFollowers = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/uapi/follow/${
        this.props.cookies.get("auth-token").user.id
      }/`,
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
        // console.log(resp)
        this.setState({ no_of_followers: resp.followers.length });
      })
      .catch((error) => console.log(error));
  };

  // for update the about
  updateAbout = () => {
    console.log("This is about.");
    fetch(
      `${process.env.REACT_APP_API_URL}/profile/about/${this.props.cookies.get(
        "about-id"
      )}/`,
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
        this.setState({ AboutCredentials: resp });
        this.setState({ aboutModalShow: false });
      })
      .catch((error) => console.log(error));
  };

  // for update the education
  updateEducation = () => {
    console.log("This is Education.");
    fetch(
      `${process.env.REACT_APP_API_URL}/uapi/users/${
        this.props.cookies.get("auth-token").user.id
      }/`,
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
        console.log(resp.user_education);
        this.setState({ EducationCredentials: resp.user_education });
        this.setState({ educationModalShow: false });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount = () => {
    this.updateProfile(); // for update the user info.
    this.getUserFollowers(); // for get the user followes.
    this.updateAbout(); // for update the user about.
    this.updateEducation();
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
          <BiEdit
            className="ml-auto mr-4"
            style={{ fontSize: "30px" }}
            onClick={() => this.onProfileModal(true)}
          />

          {/* For get User information */}
          {this.state.profileModalShow ? (
            <Link
              component={() => (
                <EditIntroModal
                  updateProfile={() => this.updateProfile()}
                  onProfileModal={(e) => this.onProfileModal(e)}
                />
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
                {this.state.no_of_followers} Connections
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
            <BiEdit
              style={{ fontSize: "30px" }}
              onClick={() => this.onAboutModal(true)}
            />

            {this.state.aboutModalShow ? (
              <Link
                component={() => (
                  <About
                    updateAbout={() => this.updateAbout()}
                    onAboutModal={(e) => this.onAboutModal(e)}
                  />
                )}
              />
            ) : null}
          </div>
          <p className="profile__stat_about">
            {this.state.AboutCredentials.about}
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
                {this.state.no_of_followers} followers
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
            <BiPlus
              onClick={() => this.onEducationModal(true)}
              style={{ fontSize: "40px" }}
            />

            {this.state.educationModalShow ? (
              <Link
                component={() => (
                  <Education
                    onEducationModal={(e) => this.onEducationModal(e)}
                    updateEducation={(e) => this.updateEducation()}
                    onCreateEducation={this.state.createEducation}
                    editEducation_id={this.state.editEducation_id}
                  />
                )}
              />
            ) : null}
          </div>

          <div>
            {this.state.EducationCredentials.map((education) => (
              <div>
                <div className="profile__education_certificate_header d-flex justify-content-between">
                  <span style={{ fontWeight: "bold", fontSize: "25px" }}>
                    {education.school}
                  </span>
                  <BiEdit
                    style={{ fontSize: "25px" }}
                    onClick={() =>
                      this.setState({
                        educationModalShow: true,
                        createEducation: false,
                        editEducation_id: education.id,
                      })
                    }
                  />
                </div>
                <span
                  style={{ fontSize: "18px", marginTop: "-15px" }}
                  className="d-flex ml-3"
                >
                  {education.degree}
                </span>
                <div>
                  <span
                    style={{ fontSize: "15px", color: "#686868" }}
                    className="d-flex ml-3"
                  >
                    {education.start_year}-{education.end_year}
                  </span>
                </div>
              </div>
            ))}
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
            <BiEdit style={{ fontSize: "30px" }} />
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
