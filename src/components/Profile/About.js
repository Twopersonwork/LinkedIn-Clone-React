import React, { Component } from "react";
import { Button, TextareaAutosize } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import { withCookies } from "react-cookie";

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modelShow: true,
      credentials: {
        about: "",
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

  // for hide the modal
  onhide = () => {
    this.setState({ modelShow: false });
    this.props.onAboutModal(false);
  };

  createAbout = (e) => {
    fetch(`${process.env.REACT_APP_API_URL}/profile/about/`, {
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
        this.props.cookies.set("about-id", resp.id);
        this.props.updateAbout();
      })
      .catch((error) => console.log(error));

    e.preventDefault();
    this.props.onAboutModal(false);
  };

  editAbout = (e) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/profile/about/${this.props.cookies.get(
        "about-id"
      )}/`,
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
        console.log(resp);
        this.setState({ modelShow: false });
        this.props.updateAbout();
      })
      .catch((error) => console.log(error));

    e.preventDefault();
    this.props.onAboutModal(false);
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
        if (resp.user_about) {
          this.setState({
            credentials: {
              about: resp.user_about.about,
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

  render() {
    return (
      <Modal
        show={this.state.modelShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.onhide}
      >
        <Modal.Header closeButton>Edit About</Modal.Header>
        <Modal.Body className="profile__modal">
          {/* About */}
          <TextareaAutosize
            rowsMax={4}
            rowsMin={4}
            variant="outlined"
            size="large"
            type="text"
            fullWidth
            id="about"
            value={this.state.credentials.about}
            label="About"
            name="about"
            onChange={this.inputChanged}
            required
            className="mb-3"
          />
        </Modal.Body>
        <Modal.Footer>
          {this.props.cookies.get("about-id") ? (
            <Button onClick={this.editAbout} style={save_button} type="submit">
              save
            </Button>
          ) : (
            <Button
              onClick={this.createAbout}
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

export default withCookies(About);
