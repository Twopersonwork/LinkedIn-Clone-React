import React, { Component } from "react";
import { Avatar, Button, TextField } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import "./EditIntroModal.css";
import { withCookies } from "react-cookie";

class EditIntroModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        firstName: "",
        lastName: "",
        headline: "",
        education: "",
        country: "",
        industry: "",
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

  createProfile = () => {
    fetch(`http://127.0.0.1:8000/profile/user_profile/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
      body: JSON.stringify(this.state.credentials),
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };

  editProfile = () => {
    fetch(
      `http://127.0.0.1:8000/profile/user_profile/${
        this.props.cookies.get("auth-token").user.user_profile.id
      }/`,
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
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };

  componentDidMount = () => {
    if (this.props.cookies.get("auth-token").user.user_profile) {
      this.setState({
        credentials: {
          firstName: this.props.cookies.get("auth-token").user.user_profile
            .firstName,
          lastName: this.props.cookies.get("auth-token").user.user_profile
            .lastName,
          headline: this.props.cookies.get("auth-token").user.user_profile
            .headline,
          education: this.props.cookies.get("auth-token").user.user_profile
            .education,
          country: this.props.cookies.get("auth-token").user.user_profile
            .country,
          location: this.props.cookies.get("auth-token").user.user_profile
            .location,
          industry: this.props.cookies.get("auth-token").user.user_profile
            .industry,
        },
      });
    }
  };

  render() {
    console.log(this.props.cookies.get("auth-token").user.user_profile);
    return (
      <Modal
        show={this.props.profileModalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => this.props.setProfileModal(false)}
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
            id="headline"
            value={this.state.credentials.headline}
            label="Headline"
            name="headline"
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
          {this.props.cookies.get("auth-token").user.user_profile ? (
            <Button
              onClick={this.editProfile}
              style={save_button}
              type="submit"
            >
              Save
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

export default withCookies(EditIntroModal);
