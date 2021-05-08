import React, { Component } from "react";
import { Avatar, Button, TextField } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import "./EditIntroModal.css";
import { withCookies } from "react-cookie";

class EditinfoModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modelShow: true,
      credentials: {
        firstName: "",
        lastName: "",
        headLine: "",
        education: "",
        country: "",
        industry: "",
        location: "",
        user: this.props.cookies.get("auth-token").user.id,
      },
    };
  }

  inputChanged = (event) => {
    console.log(event.target.value);
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  };

  createProfile = (e) => {
    fetch(`${process.env.REACT_APP_API_URL}/profile/user_profile/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
      body: JSON.stringify(this.state.credentials),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        this.props.cookies.set("profile-id", resp.id);
        this.props.updateProfile(true);
      })
      .catch((error) => console.log(error));

    e.preventDefault();
    this.getUserData();
    this.props.onProfileModal(false);
  };

  editProfile = (e) => {
    fetch(
      `${
        process.env.REACT_APP_API_URL
      }/profile/user_profile/${this.props.cookies.get("profile-id")}/`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
        body: JSON.stringify(this.state.credentials),
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState({ modelShow: false });
        this.props.updateProfile(true);
      })
      .catch((error) => console.log(error));

    e.preventDefault();
    this.getUserData();
    this.props.onProfileModal(false);
  };

  getUserData = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/uapi/users/${
        this.props.cookies.get("auth-token").user.id
      }/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log(resp)
        if (resp.user_profile) {
          this.setState({
            credentials: {
              firstName: resp.user_profile.firstName,
              lastName: resp.user_profile.lastName,
              headLine: resp.user_profile.headLine,
              education: resp.user_profile.education,
              country: resp.user_profile.country,
              location: resp.user_profile.location,
              industry: resp.user_profile.industry,
              user: this.props.cookies.get("auth-token").user.id,
            },
          });
        }
      })
      .catch((error) => console.log(error));
  };

  UNSAFE_componentWillMount() {
    this.getUserData();
  }

  componentDidMount = () => {
    if (this.props.cookies.get("auth-token").user.user_profile) {
      this.getUserData();
    }
  };

  render() {
    return (
      <Modal
        show={this.state.modelShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => this.setState({ modelShow: false })}
      >
        <Modal.Header closeButton>Edit intro</Modal.Header>
        <Modal.Body className="profile__modal">
          <img
            src="https://resi.ze-robot.com/dl/4k/4k-desktop-wallpaper.-1920%C3%971200.jpg"
            alt="background"
          />
          <Avatar src="https://static.hollywoodreporter.com/sites/default/files/2019/03/avatar-publicity_still-h_2019-compressed.jpg"></Avatar>
          <div style={{ display: "flex  " }}>
            <TextField
              className="mt-3 mb-5 mr-2"
              variant="outlined"
              size="small"
              type="text"
              fullWidth
              id="firstName"
              value={this.state.credentials.firstName}
              label="First Name"
              name="firstName"
              onChange={this.inputChanged}
              required
            />
            <TextField
              className="mt-3 mb-5 "
              variant="outlined"
              size="small"
              type="text"
              fullWidth
              id="lastName"
              value={this.state.credentials.lastName}
              label="Last Name"
              name="lastName"
              onChange={this.inputChanged}
              required
            />
          </div>
          {/* Headline */}
          <TextField
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            id="headLine"
            value={this.state.credentials.headLine}
            label="HeadLine"
            name="headLine"
            onChange={this.inputChanged}
            required
            className="mb-3"
          />
          {/* Country */}

          <TextField
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            id="country"
            value={this.state.credentials.country}
            label="Country"
            name="country"
            onChange={this.inputChanged}
            required
            className="mb-3"
          />
          {/* Location */}

          <TextField
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            id="location"
            value={this.state.credentials.location}
            label="Location"
            name="location"
            onChange={this.inputChanged}
            required
            className="mb-3"
          />
          {/* Industry */}

          <TextField
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            id="industry"
            value={this.state.credentials.industry}
            label="Industry"
            name="industry"
            onChange={this.inputChanged}
            required
            className="mb-3"
          />
        </Modal.Body>
        <Modal.Footer>
          {this.props.cookies.get("profile-id") ? (
            <Button
              onClick={this.editProfile}
              style={save_button}
              type="submit"
            >
              save
            </Button>
          ) : (
            <Button
              onClick={this.createProfile}
              style={save_button}
              type="submit"
            >
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

const save_button = {
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

export default withCookies(EditinfoModal);
