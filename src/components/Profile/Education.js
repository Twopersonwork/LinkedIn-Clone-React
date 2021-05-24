import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import { withCookies } from "react-cookie";
import "./Education.css";

class Education extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modelShow: true,
      deleteModalShow: false,
      credentials: {
        school: "",
        degree: "",
        field_of_study: "",
        start_year: "",
        end_year: "",
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
    this.props.onEducationModal(false);
  };

  // For create new education for particular user
  createEducation = (e) => {
    fetch(`${process.env.REACT_APP_API_URL}/profile/education/`, {
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
        this.props.cookies.set("education-id", resp.id);
        this.props.updateEducation();
      })
      .catch((error) => console.log(error));

    e.preventDefault();
    this.props.onEducationModal(false);
  };

  // For edit particular education for user.
  editEducation = (e) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/profile/education/${this.props.editEducation_id}/`,
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
        this.props.updateEducation();
      })
      .catch((error) => console.log(error));

    e.preventDefault();
    this.props.onEducationModal(false);
  };

  // for display education data in Modal
  getEducationData = () => {
    if (
      this.props.cookies.get("deleted-edu-id") !== this.props.editEducation_id
    ) {
      fetch(
        `${process.env.REACT_APP_API_URL}/profile/education/${this.props.editEducation_id}/`,
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
          // console.log(resp);
          if (resp) {
            this.setState({
              credentials: {
                school: resp.school,
                degree: resp.degree,
                field_of_study: resp.field_of_study,
                start_year: resp.start_year,
                end_year: resp.end_year,
                user: this.props.cookies.get("auth-token").user.id,
              },
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  deleteEducation = () => {
    this.props.cookies.set("deleted-edu-id", this.props.editEducation_id);
    fetch(
      `${process.env.REACT_APP_API_URL}/profile/education/${this.props.editEducation_id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
      }
    )
      .then((resp) => this.props.updateEducation())

      .catch((error) => console.log(error));
  };

  deleteModalDisplay = () => {
    // console.log("hell");
    this.setState({ deleteModalShow: true });
  };

  componentDidMount() {
    if (!this.props.onCreateEducation) {
      this.getEducationData();
    }
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
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "1.2rem" }}>
            <span>Edit Education</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="profile__modal">
          {/* School */}
          <TextField
            rowsMax={4}
            rowsMin={4}
            variant="outlined"
            size="large"
            type="text"
            fullWidth
            id="school"
            value={this.state.credentials.school}
            label="School"
            name="school"
            onChange={this.inputChanged}
            required
            className="mb-3"
          />
          {/* Degree */}
          <TextField
            rowsMax={4}
            rowsMin={4}
            variant="outlined"
            size="large"
            type="text"
            fullWidth
            id="degree"
            value={this.state.credentials.degree}
            label="Degree"
            name="degree"
            onChange={this.inputChanged}
            required
            className="mb-3"
          />
          {/* Field of study */}
          <TextField
            rowsMax={4}
            rowsMin={4}
            variant="outlined"
            size="large"
            type="text"
            fullWidth
            id="field_of_study"
            value={this.state.credentials.field_of_study}
            label="Field of study"
            name="field_of_study"
            onChange={this.inputChanged}
            required
            className="mb-3"
          />
          {/* start year and end year */}
          <div style={{ display: "flex  " }}>
            <TextField
              className="mt-3 mb-5 mr-2"
              variant="outlined"
              size="small"
              type="text"
              fullWidth
              id="start_year"
              value={this.state.credentials.start_year}
              label="Start Year"
              name="start_year"
              onChange={this.inputChanged}
              required
            />
            <TextField
              className="mt-3 mb-5 "
              variant="outlined"
              size="small"
              type="text"
              fullWidth
              id="end_year"
              value={this.state.credentials.end_year}
              label="End Year"
              name="end_year"
              onChange={this.inputChanged}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {this.props.onCreateEducation ? (
            <Button
              onClick={this.createEducation}
              style={save_button}
              type="submit"
            >
              <span style={{ fontWeight: "bold", textTransform: "none" }}>
                Save
              </span>
            </Button>
          ) : (
            <React.Fragment>
              <Button
                onClick={this.deleteModalDisplay}
                style={delete_button}
                type="submit"
                className="mr-auto"
              >
                <span style={{ fontWeight: "bold" }}>Delete</span>
              </Button>
              <Button
                onClick={this.editEducation}
                style={save_button}
                type="submit"
                className="ml-auto"
              >
                <span style={{ fontWeight: "bold", textTransform: "none" }}>
                  Save
                </span>
              </Button>
            </React.Fragment>
          )}
        </Modal.Footer>

        {this.state.deleteModalShow ? (
          <Modal
            show={this.state.deleteModalShow}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => this.setState({ deleteModalShow: false })}
            style={{ background: "rgba(0,0,0,0.3)" }}
            className="fade"
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ fontSize: "1.2rem" }}>
                <span>Delete?</span>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <span>Are you sure you want to delete this education?</span>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => this.setState({ deleteModalShow: false })}
                style={cancel_button}
                type="submit"
              >
                <span style={{ fontWeight: "bold", textTransform: "none" }}>
                  Cancel
                </span>
              </Button>
              <Button
                onClick={this.deleteEducation}
                style={save_button}
                type="submit"
              >
                <span style={{ fontWeight: "bold", textTransform: "none" }}>
                  Delete
                </span>
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
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

const delete_button = {
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

const cancel_button = {
  paddingLeft: "20px",
  paddingRight: "20px",
  marginTop: "10px",
  marginLeft: "10px",
  fontWeight: "bold",
  borderRadius: "50px",
  display: "flex",
  background: "white",
  color: "rgba(0,0,0,0.6)",
  border: "solid 1px black",
  fontSize: "16px",
};
export default withCookies(Education);
