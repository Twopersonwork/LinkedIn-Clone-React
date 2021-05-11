import React, { Component } from "react";
import "./Profile.css";
import { Avatar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { BiPlus, BiEdit } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import EditIntroModal from "./EditInfoModal";
import { withCookies } from "react-cookie";
import About from "./About";
import Education from "./Education";
import License from "./License";
import AddProfilePic from "./AddProfilePic";
import AddSkills from "./AddSkills";
import EditSkill from "./EditSkill";
import CreatePost from "../Feed/CreatePost";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // for display modal for user info.
      profileModalShow: false,
      // user credentials
      profileCredentials: {},
      // store the user followers.
      no_of_followers: "",

      // for display modal for user about.
      aboutModalShow: false,
      // about credentiaks.
      AboutCredentials: {},

      // for display modal for user education.
      educationModalShow: false,
      // education credentials
      EducationCredentials: [],
      // for check if it is create education or edit education
      createEducation: false,
      // id for particular education
      editEducation_id: "",

      // for display modalfor user license and certificate
      licenseModalShow: false,
      // license credentials
      LicenseCredentials: [],
      // for check if it is create license or edit license
      createLicense: false,
      // id for particular license
      editLicense_id: "",

      // for display modal for user skills
      skillsModalShow: false,
      // skill credentials
      SkillCredentials: [],
      EditSkillsModalShow: false,

      //for display show more and show less button in skills
      showMoreSkill: false,

      //for display show more and show less button in education
      showMoreEducation: false,

      //for display show more and show less button in license
      showMoreLicense: false,

      MAX_items: 3,

      createPost: false,
      profile_pic: "",
      profile_picAsFile: null,
      picShowModal: false,
    };
  }

  onCreatePost = () => {
    this.setState({ createPost: true });
  };

  //toggle skill and getRenderSkills for display show more and show less button based on Max_items
  toggleSkill = () => {
    this.setState({ showMoreSkill: !this.state.showMoreSkill });
  };

  getRenderSkills = () => {
    if (this.state.showMoreSkill) {
      return this.state.SkillCredentials;
    }
    return this.state.SkillCredentials.slice(0, this.state.MAX_items);
  };

  //toggle education and getRendereducations for display show more and show less button based on Max_items
  toggleEducation = () => {
    this.setState({ showMoreEducation: !this.state.showMoreEducation });
  };

  getRenderEducation = () => {
    if (this.state.showMoreEducation) {
      return this.state.EducationCredentials;
    }
    return this.state.EducationCredentials.slice(0, this.state.MAX_items);
  };

  //toggle license and getRenderlicenses for display show more and show less button based on Max_items
  toggleLicense = () => {
    this.setState({ showMoreLicense: !this.state.showMoreLicense });
  };

  getRenderLicense = () => {
    if (this.state.showMoreLicense) {
      return this.state.LicenseCredentials;
    }
    return this.state.LicenseCredentials.slice(0, this.state.MAX_items);
  };

  // for change the value of profileModalShow
  onProfileModal = (e) => {
    console.log("this is profileModalShow");
    this.setState({
      profileModalShow: e,
      aboutModalShow: false,
      educationModalShow: false,
      licenseModalShow: false,
      skillsModalShow: false,

      EditSkillsModalShow: false,
    });
  };

  // for change the value of aboutModalShow
  onAboutModal = (e) => {
    console.log("this is aboutModalShow");
    this.setState({
      aboutModalShow: e,
      profileModalShow: false,
      educationModalShow: false,
      licenseModalShow: false,
      skillsModalShow: false,
      EditSkillsModalShow: false,
    });
  };

  // for change the value if educationModalShow
  onEducationModal = (e) => {
    console.log("this is educationModalShow");
    this.setState({
      educationModalShow: e,
      profileModalShow: false,
      aboutModalShow: false,
      licenseModalShow: false,
      skillsModalShow: false,
      EditSkillsModalShow: false,
    });

    // when user create education this becomes true
    this.setState({ createEducation: true });
  };

  // for change the value if licenseModalShow
  onLicenseModal = (e) => {
    console.log("this is licenseModalShow");
    this.setState({
      licenseModalShow: e,
      aboutModalShow: false,
      educationModalShow: false,
      profileModalShow: false,
      skillsModalShow: false,
      EditSkillsModalShow: false,
    });

    // when user create license this becomes true
    this.setState({ createLicense: true });
  };

  onSkillModal = (e) => {
    console.log("this is skillsModalshow");
    this.setState({
      skillsModalShow: e,
      aboutModalShow: false,
      educationModalShow: false,
      licenseModalShow: false,
      profileModalShow: false,
      EditSkillsModalShow: false,
    });
  };

  onEditSkillModal = () => {
    console.log("ll");
    this.setState({
      EditSkillsModalShow: true,
      aboutModalShow: false,
      educationModalShow: false,
      licenseModalShow: false,
      profileModalShow: false,
      skillsModalShow: false,
    });
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

  updateLicense = () => {
    console.log("This is License.");
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
        console.log(resp.user_license);
        this.setState({ LicenseCredentials: resp.user_license });
        this.setState({ licenseModalShow: false });
      })
      .catch((error) => console.log(error));
  };

  updateSkills = () => {
    console.log("this is updateskill");
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
        console.log("skill", resp.user_skills);
        this.setState({ SkillCredentials: resp.user_skills });
        this.setState({ skillsModalShow: false });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount = () => {
    // for update the user info.
    this.updateProfile();
    // for getting the user followes.
    this.getUserFollowers();
    // for updating the user about.
    this.updateAbout();
    // for updating the user education
    this.updateEducation();
    // for update the user license and certification
    this.updateLicense();
    // for update the skills data
    this.updateSkills();
    console.log("called comp");
    fetch(
      `http://127.0.0.1:8000/uapi/users/${
        this.props.cookies.get("auth-token").user.id
      }/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("comp response", resp);
        this.setState({ profile_pic: resp.profile_pic });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="profile">
        <div className="profile__top">
          <img
            src="https://resi.ze-robot.com/dl/4k/4k-desktop-wallpaper.-1920%C3%971200.jpg"
            alt="background"
          />
          {this.state.profile_pic ? (
            <Avatar
              onClick={() => {
                this.setState({ picShowModal: true });
              }}
              className="img_wrp"
              src={this.state.profile_pic}
              alt="Profile"
            />
          ) : (
            <Avatar
              onClick={() => {
                this.setState({ picShowModal: true });
              }}
              className="post__image img_wrp"
              src="/images/user.svg"
              alt="Profile"
            />
          )}
          {/* <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => this.handleProfilePic(e)}
          />
          <label htmlFor="file">
            <CameraAltRoundedIcon
              className="profile__image"
              style={{ color: "black" }}
            />
          </label> */}
          {this.state.picShowModal ? (
            <Link
              component={() => (
                <AddProfilePic
                  profile_pic={this.state.profile_pic}
                  profile_picAsFile={this.state.profile_picAsFile}
                />
              )}
            ></Link>
          ) : null}

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
                  : `${
                      this.props.cookies.get("auth-token").user.username
                    }`}{" "}
                {this.state.profileCredentials.lastName}
              </h4>
            </div>
            <Typography className="profile__stat">
              {this.state.profileCredentials.headLine}
            </Typography>
            <Typography className="profile__stat">
              {this.state.profileCredentials.location ? (
                <React.Fragment>
                  {this.state.profileCredentials.location}
                  {", "}
                  {this.state.profileCredentials.country}
                  <Typography className="profile__stat_connections">
                    {this.state.no_of_followers} Connections
                  </Typography>
                </React.Fragment>
              ) : (
                <Typography
                  className="profile__stat_connections"
                  style={{ marginLeft: "-20px" }}
                >
                  {this.state.no_of_followers} Connections
                </Typography>
              )}
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
            <span style={{ fontSize: "25px" }}>About</span>
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
          <span
            style={{ fontSize: "25px" }}
            className="profile__dashboard_header d-flex justify-content-between"
          >
            Your Dashboard
          </span>
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
            <span style={{ fontSize: "25px" }}>Activity</span>

            <Button
              size="small"
              style={{ marginTop: "-20px" }}
              onClick={this.onCreatePost}
            >
              Start Post
            </Button>
            {this.state.createPost ? (
              <Link component={() => <CreatePost />} />
            ) : null}
          </div>
          <div>
            <Link to={"/followers"}>
              <span
                className="profile__activity_followers"
                style={{ marginTop: "-30px", marginBottom: "10px" }}
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
            <Link to={"/activity"} style={{ textDecoration: "none" }}>
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
            {this.getRenderEducation().map((education) => (
              <div>
                <div className="profile__education_header d-flex justify-content-between">
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
            {this.state.EducationCredentials.length > 3 ? (
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
            <BiPlus
              style={{ fontSize: "40px" }}
              onClick={() => this.onLicenseModal(true)}
            />

            {this.state.licenseModalShow ? (
              <Link
                component={() => (
                  <License
                    onLicenseModal={(e) => this.onLicenseModal(e)}
                    updateLicense={(e) => this.updateLicense()}
                    onCreateLicense={this.state.createLicense}
                    editLicense_id={this.state.editLicense_id}
                  />
                )}
              />
            ) : null}
          </div>

          <div>
            {this.getRenderLicense().map((license) => (
              <div>
                <div className="profile__education_header d-flex justify-content-between">
                  <span style={{ fontWeight: "bold", fontSize: "25px" }}>
                    {license.name}
                  </span>
                  <BiEdit
                    style={{ fontSize: "25px" }}
                    onClick={() =>
                      this.setState({
                        licenseModalShow: true,
                        createLicense: false,
                        editLicense_id: license.id,
                      })
                    }
                  />
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
            {this.state.LicenseCredentials.length > 3 ? (
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
            <Button
              className="mr-left"
              size="small"
              style={{ marginTop: "-20px", marginRight: "20px" }}
              onClick={this.onSkillModal}
            >
              Add a new skill
            </Button>
            <BiEdit
              style={{ fontSize: "30px" }}
              onClick={this.onEditSkillModal}
            />
            {this.state.skillsModalShow ? (
              <Link
                component={() => (
                  <AddSkills
                    onSkillModal={(e) => this.onSkillModal(e)}
                    updateSkills={(e) => this.updateSkills()}
                  />
                )}
              />
            ) : null}

            {this.state.EditSkillsModalShow ? (
              <Link
                component={() => (
                  <EditSkill
                    onEditSkillModal={(e) => this.onEditSkillModal(e)}
                    updateSkills={(e) => this.updateSkills()}
                    SkillCredentials={this.state.SkillCredentials}
                  />
                )}
              />
            ) : null}
          </div>

          {this.getRenderSkills().map((skill) => (
            <div>
              <div className="profile__skills_header d-flex justify-content-between">
                <span style={{ fontSize: "25px", fontWeight: "500" }}>
                  {skill.skill}
                </span>
              </div>
            </div>
          ))}
          {this.state.SkillCredentials.length > 3 ? (
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

export default withCookies(Profile);
