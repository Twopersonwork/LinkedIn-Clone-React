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
import CameraAltSharpIcon from "@material-ui/icons/CameraAltSharp";
import AddCoverPic from "./AddCoverPic";
import ShowFollowers from "./ShowFollowers";
import ContactInfo from "./ContactInfo";
import { trackPromise } from "react-promise-tracker";
import UserContext from "../userContext";

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

      // for display followers
      showFollowers: false,
      // for display contact information
      showContactInfo: false,
      MAX_items: 3,

      createPost: false,

      profile_pic: "",
      cover_pic: "",
      profile_picAsFile: null,
      picShowModal: false,
      coverPicModal: false,
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
    // console.log("this is profileModalShow");
    this.setState({
      profileModalShow: e,
      aboutModalShow: false,
      educationModalShow: false,
      licenseModalShow: false,
      skillsModalShow: false,

      EditSkillsModalShow: false,
      createPost: false,
      showFollowers: false,
    });
  };

  // for change the value of aboutModalShow
  onAboutModal = (e) => {
    // console.log("this is aboutModalShow");
    this.setState({
      aboutModalShow: e,
      profileModalShow: false,
      educationModalShow: false,
      licenseModalShow: false,
      skillsModalShow: false,
      EditSkillsModalShow: false,
      createPost: false,
      showFollowers: false,
    });
  };
  onShowFollower = (e) => {
    this.setState({
      showFollowers: e,
      aboutModalShow: false,
      profileModalShow: false,
      educationModalShow: false,
      licenseModalShow: false,
      skillsModalShow: false,
      EditSkillsModalShow: false,
      createPost: false,
    });
  };

  // for change the value if educationModalShow
  onEducationModal = (e) => {
    // console.log("this is educationModalShow");
    this.setState({
      educationModalShow: e,
      profileModalShow: false,
      aboutModalShow: false,
      licenseModalShow: false,
      skillsModalShow: false,
      EditSkillsModalShow: false,
      createPost: false,
      showFollowers: false,
    });

    // when user create education this becomes true
    this.setState({ createEducation: true });
  };

  // for change the value if licenseModalShow
  onLicenseModal = (e) => {
    // console.log("this is licenseModalShow");
    this.setState({
      licenseModalShow: e,
      aboutModalShow: false,
      educationModalShow: false,
      profileModalShow: false,
      skillsModalShow: false,
      EditSkillsModalShow: false,
      createPost: false,
      showFollowers: false,
    });

    // when user create license this becomes true
    this.setState({ createLicense: true });
  };

  onSkillModal = (e) => {
    // console.log("this is skillsModalshow");
    this.setState({
      skillsModalShow: e,
      aboutModalShow: false,
      educationModalShow: false,
      licenseModalShow: false,
      profileModalShow: false,
      EditSkillsModalShow: false,
      createPost: false,
      showFollowers: false,
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
      createPost: false,
      showFollowers: false,
    });
  };
  // for update the user credentials.
  updateProfile = () => {
    // console.log("This is update profiel");
    trackPromise(
      fetch(
        `${
          process.env.REACT_APP_API_URL
        }/profile/user_profile/${this.props.cookies.get("profile-id")}/`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${
              this.props.cookies.get("auth-token").token
            }`,
          },
        }
      )
        .then((resp) => resp.json())
        .then((resp) => {
          this.setState({ profileCredentials: resp });
          this.setState({ profileModalShow: false });
        })
    ).catch((error) => console.log(error));
  };

  // for get the user followers
  getUserFollowers = () => {
    trackPromise(
      fetch(
        `${process.env.REACT_APP_API_URL}/uapi/follow/${
          this.props.cookies.get("auth-token").user.id
        }/`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${
              this.props.cookies.get("auth-token").token
            }`,
          },
        }
      )
        .then((resp) => resp.json())
        .then((resp) => {
          // console.log(resp)
          this.setState({ no_of_followers: resp.followers.length });
        })
    ).catch((error) => console.log(error));
  };

  // for update the about
  updateAbout = () => {
    // console.log("This is about.");
    trackPromise(
      fetch(
        `${
          process.env.REACT_APP_API_URL
        }/profile/about/${this.props.cookies.get("about-id")}/`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${
              this.props.cookies.get("auth-token").token
            }`,
          },
        }
      )
        .then((resp) => resp.json())
        .then((resp) => {
          this.setState({ AboutCredentials: resp });
          this.setState({ aboutModalShow: false });
        })
    ).catch((error) => console.log(error));
  };

  // for update the education
  updateEducation = () => {
    // console.log("This is Education.");
    trackPromise(
      fetch(
        `${process.env.REACT_APP_API_URL}/uapi/users/${
          this.props.cookies.get("auth-token").user.id
        }/`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${
              this.props.cookies.get("auth-token").token
            }`,
          },
        }
      )
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp.user_education);
          this.setState({ EducationCredentials: resp.user_education });
          this.setState({ educationModalShow: false });
        })
    ).catch((error) => console.log(error));
  };

  updateLicense = () => {
    // console.log("This is License.");
    trackPromise(
      fetch(
        `${process.env.REACT_APP_API_URL}/uapi/users/${
          this.props.cookies.get("auth-token").user.id
        }/`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${
              this.props.cookies.get("auth-token").token
            }`,
          },
        }
      )
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp.user_license);
          this.setState({ LicenseCredentials: resp.user_license });
          this.setState({ licenseModalShow: false });
        })
    ).catch((error) => console.log(error));
  };

  updateSkills = () => {
    // console.log("this is updateskill");
    trackPromise(
      fetch(
        `${process.env.REACT_APP_API_URL}/uapi/users/${
          this.props.cookies.get("auth-token").user.id
        }/`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${
              this.props.cookies.get("auth-token").token
            }`,
          },
        }
      )
        .then((resp) => resp.json())
        .then((resp) => {
          // console.log("skill", resp.user_skills);
          this.setState({ SkillCredentials: resp.user_skills });
          this.setState({ skillsModalShow: false });
        })
    ).catch((error) => console.log(error));
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
    trackPromise(
      fetch(
        `${process.env.REACT_APP_API_URL}/uapi/users/${
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
          this.setState({
            user: resp,
            profile_pic: resp.profile_pic,
            cover_pic: resp.cover_pic,
          });
        })
    ).catch((error) => console.log(error));
  };

  render() {
    console.log(this.state.no_of_followers);
    return (
      <div className="profile">
        <div className="profile__top">
          <img src={this.state.cover_pic} alt="background" />

          <CameraAltSharpIcon
            style={{ fontSize: "30px" }}
            className="cover__image"
            onClick={() => {
              this.setState({ coverPicModal: true, picShowModal: false });
            }}
          />

          <Avatar
            onClick={() => {
              this.setState({ picShowModal: true, coverPicModal: false });
            }}
            className="img_wrp"
            src={this.state.profile_pic}
            alt="Profile"
          />

          {this.state.picShowModal && !this.state.coverPicModal ? (
            <Link
              component={() => (
                <AddProfilePic
                  profile_pic={this.state.profile_pic}
                  profile_picAsFile={this.state.profile_picAsFile}
                />
              )}
            ></Link>
          ) : null}

          {this.state.coverPicModal && !this.state.picShowModal ? (
            <Link
              component={() => (
                <AddCoverPic
                  cover_pic={this.state.cover_pic}
                  modalCoverShow={this.state.coverPicModal}
                />
              )}
            ></Link>
          ) : null}

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
            <div className="profile__stat d-flex justify-content-between">
              <h4>
                {this.state.profileCredentials.firstName ? (
                  <span style={{ fontWeight: "bold", fontSize: "100%" }}>
                    {this.state.profileCredentials.firstName}
                  </span>
                ) : (
                  <span style={{ fontWeight: "bold", fontSize: "100%" }}>
                    {this.props.cookies.get("auth-token").user.username}
                  </span>
                )}{" "}
                <span style={{ fontWeight: "bold", fontSize: "100%" }}>
                  {this.state.profileCredentials.lastName}
                </span>
              </h4>
              {/* Create model for user,for add the profile info. */}
              <BiEdit
                className="ml-auto mr-4"
                style={{ fontSize: "30px" }}
                onClick={() => this.onProfileModal(true)}
              />
            </div>
            <Typography className="profile__stat">
              <span>{this.state.profileCredentials.headLine}</span>
            </Typography>

            <Typography className="profile__stat">
              {this.state.profileCredentials.location ? (
                <React.Fragment>
                  <span className="text-muted" style={{ fontSize: "16px" }}>
                    {this.state.profileCredentials.location}
                    {","}

                    {this.state.profileCredentials.country}
                  </span>
                  <Typography className="profile__stat_connections">
                    {this.state.no_of_followers > 1 ? (
                      <span
                        onClick={() => this.setState({ showFollowers: true })}
                        style={{ fontWeight: "bold", fontSize: "16px" }}
                      >
                        {this.state.no_of_followers} Connections
                      </span>
                    ) : (
                      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                        {this.state.no_of_followers} Connection
                      </span>
                    )}
                  </Typography>
                </React.Fragment>
              ) : (
                <Typography
                  className="profile__stat_connections"
                  style={{ marginLeft: "-20px" }}
                >
                  {this.state.no_of_followers > 1 ? (
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      {this.state.no_of_followers} Connections
                    </span>
                  ) : (
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      {this.state.no_of_followers} Connection
                    </span>
                  )}
                </Typography>
              )}
            </Typography>

            <Link className="profile__stat_connections mt-2">
              <span
                style={{ fontWeight: "bold", fontSize: "16px" }}
                onClick={() => this.setState({ showContactInfo: true })}
              >
                Contact info
              </span>
            </Link>
            {/* {this.state.showContactInfo ? (
              <ContactInfo
                user={this.state.user}
                onContactChange={(e) => this.setState({ showContactInfo: e })}
              />
            ) : null} */}
            {this.state.showContactInfo ? (
              this.state.profileCredentials ? (
                <UserContext.Consumer>
                  {(props) => {
                    return (
                      <ContactInfo
                        user={this.state.profileCredentials}
                        email={props.user.email}
                        onContactChange={(e) =>
                          this.setState({ showContactInfo: e })
                        }
                      />
                    );
                  }}
                </UserContext.Consumer>
              ) : (
                <UserContext.Consumer>
                  {(props) => {
                    return (
                      <ContactInfo
                        user={props.user}
                        email={props.user.email}
                        onContactChange={(e) =>
                          this.setState({ showContactInfo: e })
                        }
                      />
                    );
                  }}
                </UserContext.Consumer>
              )
            ) : null}

            <div className="profile__stat">
              <Button style={open_to}>
                <span style={{ fontWeight: "bold" }}>Open to</span>
              </Button>
              <Button style={profile_button}>
                <span style={{ fontWeight: "bold" }}>Add profile section</span>
              </Button>
              <Button style={profile_button}>
                <span style={{ fontWeight: "bold" }}>More</span>
              </Button>
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
              style={start_post}
              onClick={() => this.setState({ createPost: true })}
            >
              <span style={{ fontWeight: "bold" }}>Start a post</span>
            </Button>
            {this.state.createPost ? (
              <Link component={() => <CreatePost />} />
            ) : null}
          </div>
          <div>
            <span
              className="profile__activity_followers"
              style={{ marginTop: "-10px", marginBottom: "10px" }}
              onClick={this.onShowFollower}
            >
              {this.state.no_of_followers} followers
            </span>
            {this.state.showFollowers ? (
              <ShowFollowers
                followers={this.state.user.followers}
                onChangeFollowers={(e) => this.onShowFollower(e)}
              />
            ) : null}
          </div>
          <div className="pl-2">
            <span
              style={{
                fontSize: "19px",
              }}
            >
              Posts you created, shared, or commented on in the last 90 days are
              displayed here.
            </span>
          </div>
          <div>
            <Link
              to={{
                pathname: "/activity",
                state: this.props.cookies.get("auth-token").user.id,
              }}
              style={{ textDecoration: "none" }}
            >
              <Button
                className="mt-3"
                style={{
                  width: "100%",
                  marginBottom: "-9px",
                  color: "rgb(95, 95, 95)",
                  textTransform: "none",
                }}
              >
                <span style={{ fontWeight: "bold" }}>See all Activity</span>
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
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      textTransform: "uppercase",
                    }}
                  >
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
                {this.state.showMoreEducation ? (
                  <span
                    style={{
                      fontWeight: "bold",
                      textTransform: "none",
                      color: "rgb(95, 95, 95)",
                    }}
                  >
                    Show Less
                  </span>
                ) : (
                  <span
                    style={{
                      fontWeight: "bold",
                      textTransform: "none",
                      color: "rgb(95, 95, 95)",
                    }}
                  >
                    Show More
                  </span>
                )}
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
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
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
                {this.state.showMoreLicense ? (
                  <span
                    style={{
                      fontWeight: "bold",
                      textTransform: "none",
                      color: "rgb(95, 95, 95)",
                    }}
                  >
                    Show Less
                  </span>
                ) : (
                  <span
                    style={{
                      fontWeight: "bold",
                      textTransform: "none",
                      color: "rgb(95, 95, 95)",
                    }}
                  >
                    Show More
                  </span>
                )}
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
              // style={
              //   ({
              //     marginTop: "-20px",
              //     marginRight: "20px",
              //     textTransform: "none",
              //   },
              //   { start_post })
              // }
              style={add_activity}
              onClick={this.onSkillModal}
            >
              <span style={{ fontWeight: "bold" }}> Add a new skill</span>
            </Button>
            {this.state.SkillCredentials.length > 0 ? (
              <BiEdit
                style={{ fontSize: "30px" }}
                onClick={this.onEditSkillModal}
              />
            ) : null}
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
            <div className="profile__skills_name">
              <span
                className="profile__skills_content"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {skill.skill}
              </span>
              <hr />
            </div>
          ))}
          {this.state.SkillCredentials.length > 3 ? (
            <Button style={{ width: "100%" }} onClick={this.toggleSkill}>
              {this.state.showMoreSkill ? (
                <span
                  style={{
                    fontWeight: "bold",
                    textTransform: "none",
                    color: "rgb(95, 95, 95)",
                  }}
                >
                  Show Less
                </span>
              ) : (
                <span
                  style={{
                    fontWeight: "bold",
                    textTransform: "none",
                    color: "rgb(95, 95, 95)",
                  }}
                >
                  Show More
                </span>
              )}
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
  borderRadius: "50px",
  display: "flex",
  color: "rgb(95, 95, 95)",
  border: "solid 1px black",
  textTransform: "none",
};
const start_post = {
  paddingLeft: "20px",
  paddingRight: "20px",
  marginTop: "-20px",
  marginLeft: "10px",
  display: "flex",
  textTransform: "none",
  color: "rgb(95, 95, 95)",
  fontSize: "18px",
};
const add_activity = {
  marginTop: "-20px",
  marginRight: "20px",
  // paddingLeft: "20px",
  // paddingRight: "20px",
  marginTop: "-20px",
  // marginLeft: "10px",
  display: "flex",
  textTransform: "none",
  color: "rgb(95, 95, 95)",
  fontSize: "18px",
};
const open_to = {
  textTransform: "none",
  paddingLeft: "20px",
  paddingRight: "20px",
  marginTop: "10px",
  marginLeft: "10px",
  fontWeight: "bold",
  borderRadius: "50px",
  display: "flex",
  background: "#0c66c2",
  color: "white",
  border: "solid 1px #0c66c2",
};
export default withCookies(Profile);
