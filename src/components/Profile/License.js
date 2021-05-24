import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import { withCookies } from "react-cookie";
import "./License.css";

class License extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modelShow: true,
      issue_date_error: "",
      expiration_date_error: "",
      deleteModalShow: false,
      credentials: {
        name: "",
        issuing_org: "",
        issue_date: null,
        expiration_date: null,
        credential_id: "",
        user: this.props.cookies.get("auth-token").user.id,
      },
    };
  }

  inputChanged = (event) => {
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    if (event.target.name === "expiration_date" && event.target.value === "") {
      cred["expiration_date"] = null;
    }
    if (event.target.name === "issue_date" && event.target.value === "") {
      cred["issue_date"] = null;
    }
    this.setState({ credentials: cred });
  };

  // for hide the modal
  onhide = () => {
    this.setState({ modelShow: false });
    this.props.onLicenseModal(false);
  };
  // create new liecense or cetificate for currently login user
  createLicense = (e) => {
    fetch(`${process.env.REACT_APP_API_URL}/profile/license/`, {
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
        this.props.cookies.set("license-id", resp.id);
        this.props.updateLicense();
      })
      .catch((error) => console.log(error));

    e.preventDefault();
    this.props.onLicenseModal(false);
  };

  // edit license or certificate for currently login user
  editLicense = (e) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/profile/license/${this.props.editLicense_id}/`,
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
        if (!resp.name) {
          if (resp.issue_date) {
            this.setState({ issue_date_error: resp.issue_date });
          }
          if (resp.expiration_date) {
            this.setState({ expiration_date_error: resp.expiration_date });
          }
        } else {
          this.setState({ modelShow: false });
          this.props.updateLicense();
          e.preventDefault();
          this.props.onLicenseModal(false);
        }
      })
      .catch((error) => console.log(error));
  };

  // get data for particular license
  getLicenseData = () => {
    if (
      this.props.cookies.get("deleted-license-id") !== this.props.editLicense_id
    ) {
      fetch(
        `${process.env.REACT_APP_API_URL}/profile/license/${this.props.editLicense_id}/`,
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
                name: resp.name,
                issuing_org: resp.issuing_org,
                issue_date: resp.issue_date,
                expiration_date: resp.expiration_date,
                credential_id: resp.credential_id,
                user: this.props.cookies.get("auth-token").user.id,
              },
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  // delete license
  deleteLicense = (e) => {
    this.props.cookies.set("deleted-license-id", this.props.editLicense_id);
    fetch(
      `${process.env.REACT_APP_API_URL}/profile/license/${this.props.editLicense_id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
      }
    )
      .then((resp) => this.props.updateLicense())

      .catch((error) => console.log(error));
  };

  deleteModalDisplay = () => {
    console.log("hell");
    this.setState({ deleteModalShow: true });
  };

  componentDidMount() {
    if (!this.props.onCreateLicense) {
      this.getLicenseData();
    }
  }

  render() {
    console.log(this.state.deleteModalShow);
    return (
      <Modal
        show={this.state.modelShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.onhide}
        style={{ background: "rgba(0,0,0,0.2)" }}
        className="fade"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span style={{ fontSize: "1.2rem" }}>
              Edit license or certification
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="profile__modal">
          {/* name */}
          <TextField
            rowsMax={4}
            rowsMin={4}
            variant="outlined"
            size="large"
            type="text"
            fullWidth
            id="name"
            value={this.state.credentials.name}
            label="Name"
            name="name"
            onChange={this.inputChanged}
            required
            className="mb-3"
          />
          {/* issuing_org */}
          <TextField
            rowsMax={4}
            rowsMin={4}
            variant="outlined"
            size="large"
            type="text"
            fullWidth
            id="issuing_org"
            value={this.state.credentials.issuing_org}
            label="Issuing_organization"
            name="issuing_org"
            onChange={this.inputChanged}
            required
            className="mb-3"
          />

          {/* issue_date and expiration date */}
          <div style={{ display: "flex  " }}>
            <TextField
              error={this.state.issue_date_error ? true : false}
              helperText={this.state.issue_date_error}
              className="mt-3 mb-5 mr-2"
              size="small"
              type="date"
              fullWidth
              id="issue_date"
              value={this.state.credentials.issue_date}
              label="Issue Date"
              name="issue_date"
              onChange={this.inputChanged}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              error={this.state.expiration_date_error ? true : false}
              helperText={this.state.expiration_date_error}
              className="mt-3 mb-5 "
              size="small"
              type="date"
              fullWidth
              id="expiration_date"
              value={this.state.credentials.expiration_date}
              label="Expiration Date"
              name="expiration_date"
              onChange={this.inputChanged}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          {/* credential_id */}
          <TextField
            rowsMax={4}
            rowsMin={4}
            variant="outlined"
            size="large"
            type="text"
            fullWidth
            id="credential_id"
            value={this.state.credentials.credential_id}
            label="Credential ID"
            name="credential_id"
            onChange={this.inputChanged}
            required
            className="mb-3"
          />
        </Modal.Body>
        <Modal.Footer>
          {this.props.onCreateLicense ? (
            <Button
              onClick={this.createLicense}
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
                <span style={{ fontWeight: "bold", textTransform: "none" }}>
                  Delete
                </span>
              </Button>
              <Button
                onClick={this.editLicense}
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
            className="mine"
            show={this.state.deleteModalShow}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => this.setState({ deleteModalShow: false })}
            style={{ background: "rgba(0,0,0,0.3)" }}
            className="fade"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <span style={{ fontSize: "1.1rem" }}>
                  Delete license or certification
                </span>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <span>
                Are you sure you want to delete {this.state.credentials.name} ?
              </span>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => this.setState({ deleteModalShow: false })}
                style={cancel_button}
                type="submit"
              >
                <span style={{ fontWeight: "bold", textTransform: "none" }}>
                  No thanks
                </span>
              </Button>
              <Button
                onClick={this.deleteLicense}
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
  fontSize: "20px",
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
  fontSize: "20px",
};

const cancel_button = {
  // paddingLeft: "20px",
  // paddingRight: "20px",
  marginTop: "10px",
  // marginLeft: "10px",
  fontWeight: "bold",
  borderRadius: "50px",
  display: "flex",
  background: "white",
  color: "rgba(0,0,0,0.6)",
  border: "solid 1px black",
  fontSize: "20px",
};

export default withCookies(License);
