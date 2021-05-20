import React, { Component } from "react";
import "./Profile.css";
import { Avatar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { withCookies } from "react-cookie";
import ShowFollowers from "./ShowFollowers";
import ContactInfo from "./ContactInfo";

class OtherUserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",

      MAX_items: 2,
      showMoreSkill: false,
      showMoreEducation: false,
      showMoreLicense: false,

      showFollowers: false,
      showContactInfo: false,
    };
  }

  //toggle skill and getRenderSkills for display show more and show less button based on Max_items
  toggleSkill = () => {
    this.setState({ showMoreSkill: !this.state.showMoreSkill });
  };

  getRenderSkills = () => {
    if (this.state.showMoreSkill) {
      return this.state.user.user_skills;
    } else if (this.state.user.user_skills) {
      return this.state.user.user_skills.slice(0, this.state.MAX_items);
    }
    return null;
  };

  //toggle education and getRendereducations for display show more and show less button based on Max_items
  toggleEducation = () => {
    this.setState({ showMoreEducation: !this.state.showMoreEducation });
  };

  getRenderEducation = () => {
    if (this.state.showMoreEducation) {
      return this.state.user.user_education;
    } else if (this.state.user.user_education) {
      return this.state.user.user_education.slice(0, this.state.MAX_items);
    }

    return null;
  };

  //toggle license and getRenderlicenses for display show more and show less button based on Max_items
  toggleLicense = () => {
    this.setState({ showMoreLicense: !this.state.showMoreLicense });
  };

  getRenderLicense = () => {
    if (this.state.showMoreLicense) {
      return this.state.user.user_license;
    } else if (this.state.user.user_license) {
      return this.state.user.user_license.slice(0, this.state.MAX_items);
    }
    return null;
  };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_API_URL}/uapi/users/${this.props.location.state}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState({ user: resp });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="profile">
        <div className="profile__top">
          <img src={this.state.user.cover_pic} alt="background" />

          <Avatar
            className="img_wrp"
            src={this.state.user.profile_pic}
            alt="Profile"
          />

          <div className="profile__stats" style={{ marginTop: "-10px" }}>
            <div className="profile__stat">
              <h4>
                {this.state.user.user_profile
                  ? this.state.user.user_profile.firstName
                    ? this.state.user.user_profile.firstName +
                      " " +
                      this.state.user.user_profile.lastName
                    : this.state.user.username
                  : this.state.user.username}
              </h4>
            </div>
            {this.state.user.user_profile ? (
              this.state.user.user_profile.headLine ? (
                <Typography className="profile__stat">
                  {this.state.user.user_profile.headLine}
                </Typography>
              ) : null
            ) : null}

            <Typography className="profile__stat">
              {this.state.user.user_profile ? (
                this.state.user.user_profile.location ? (
                  <React.Fragment>
                    {this.state.user.user_profile.location}
                    {", "}
                    {this.state.user.user_profile.country
                      ? this.state.user.user_profile.country
                      : null}
                    <Typography className="profile__stat_connections">
                      {this.state.user.followers &&
                      this.state.user.followers.length > 500
                        ? "500+"
                        : this.state.user.followers.length}{" "}
                      Connections
                    </Typography>
                  </React.Fragment>
                ) : (
                  <Typography
                    className="profile__stat_connections"
                    style={{ marginLeft: "-20px" }}
                  >
                    {this.state.user.followers &&
                    this.state.user.followers.length > 500
                      ? "500+"
                      : this.state.user.followers.length}{" "}
                  </Typography>
                )
              ) : null}
            </Typography>

            <Link className="profile__stat_connections mt-2">
              <span onClick={() => this.setState({ showContactInfo: true })}>
                Contact info
              </span>
            </Link>
            {this.state.showContactInfo ? (
              <ContactInfo
                user={this.state.user}
                onContactChange={(e) => this.setState({ showContactInfo: e })}
              />
            ) : null}
          </div>
        </div>

        {/* About */}
        <div className="profile__about mt-3">
          <div className="profile__about_header d-flex justify-content-between">
            <span style={{ fontSize: "25px" }}>About</span>
          </div>
          <p className="profile__stat_about">
            {this.state.user.user_about
              ? this.state.user.user_about.about
              : null}
          </p>
        </div>

        {/*  Activity */}

        <div className="profile__activity">
          <div className="profile__activity_header d-flex justify-content-between">
            <span style={{ fontSize: "25px" }}>Activity</span>
          </div>
          <div>
            <span
              className="profile__activity_followers"
              style={{ marginTop: "-10px", marginBottom: "10px" }}
              onClick={() => this.setState({ showFollowers: true })}
            >
              {this.state.user.followers ? this.state.user.followers.length : 0}{" "}
              followers
            </span>
          </div>
          {this.state.showFollowers ? (
            <ShowFollowers
              followers={this.state.user.followers}
              onChangeFollowers={(e) => this.setState({ showFollowers: e })}
            />
          ) : null}
          <div className="pl-1">
            <span
              style={{
                fontSize: "19px",
              }}
            >
              Posts {this.state.user.username} created, shared, or commented on
              in the last 90 days are displayed here.
            </span>
          </div>
          <div>
            <Link
              to={{ pathname: "/activity", state: this.state.user.id }}
              style={{ textDecoration: "none" }}
            >
              <Button
                className="mt-3"
                style={{ width: "100%", marginBottom: "-9px" }}
              >
                See all Activity
              </Button>
            </Link>
          </div>
        </div>

        {/* Education  */}
        <div className="profile__education">
          <div className="profile__education_header d-flex justify-content-between">
            <span style={{ fontSize: "25px" }}>Education</span>
          </div>

          <div>
            {this.getRenderEducation() === null
              ? null
              : this.getRenderEducation().map((education) => (
                  <div>
                    <div className="profile__education_header d-flex justify-content-between">
                      <span style={{ fontWeight: "bold", fontSize: "25px" }}>
                        {education.school}
                      </span>
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
            {this.state.user.user_education &&
            this.state.user.user_education.length > 2 ? (
              <Button style={{ width: "100%" }} onClick={this.toggleEducation}>
                {this.state.showMoreEducation ? "Show Less" : "Show More"}
                {this.state.showMoreEducation ? (
                  <FiChevronUp className="ml-2" />
                ) : (
                  <FiChevronDown className="ml-2" />
                )}
              </Button>
            ) : null}
          </div>
        </div>

        {/* License & Certificate */}

        <div className="profile__license">
          <div className="profile__license_header d-flex justify-content-between">
            <span style={{ fontSize: "25px" }}>Licenses & certifications</span>
          </div>

          <div>
            {this.getRenderLicense() === null
              ? null
              : this.getRenderLicense().map((license) => (
                  <div>
                    <div className="profile__education_header d-flex justify-content-between">
                      <span style={{ fontWeight: "bold", fontSize: "25px" }}>
                        {license.name}
                      </span>
                    </div>
                    <span
                      style={{ fontSize: "18px", marginTop: "-15px" }}
                      className="d-flex ml-3"
                    >
                      {license.issuing_org}
                    </span>
                    <div>
                      {license.issue_date ? (
                        <span
                          style={{ fontSize: "15px", color: "#686868" }}
                          className="d-flex ml-3"
                        >
                          Issued {license.issue_date}{" "}
                          {license.expiration_date ? "-Expiration" : null}{" "}
                          {license.expiration_date}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}

            {this.state.user.user_license &&
            this.state.user.user_license.length > 2 ? (
              <Button style={{ width: "100%" }} onClick={this.toggleLicense}>
                {this.state.showMoreLicense ? "Show Less" : "Show More"}
                {this.state.showMoreLicense ? (
                  <FiChevronUp className="ml-2" />
                ) : (
                  <FiChevronDown className="ml-2" />
                )}
              </Button>
            ) : null}
          </div>
        </div>

        {/* Skills & endorsements */}
        <div className="profile__skills">
          <div className="profile__skills_header d-flex bd-highlight">
            <span style={{ fontSize: "25px" }} className="mr-auto">
              Skills & Endorsements
            </span>
          </div>

          {this.getRenderSkills() === null
            ? null
            : this.getRenderSkills().map((skill) => (
                <div>
                  <div className="profile__skills_header d-flex justify-content-between">
                    <span style={{ fontSize: "25px", fontWeight: "500" }}>
                      {skill.skill}
                    </span>
                  </div>
                </div>
              ))}

          {this.state.user.user_skills &&
          this.state.user.user_skills.length > 2 ? (
            <Button style={{ width: "100%" }} onClick={this.toggleSkill}>
              {this.state.showMoreSkill ? "Show Less" : "Show More"}
              {this.state.showMoreSkill ? (
                <FiChevronUp className="ml-2" />
              ) : (
                <FiChevronDown className="ml-2" />
              )}
            </Button>
          ) : null}
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

export default withCookies(OtherUserProfile);
