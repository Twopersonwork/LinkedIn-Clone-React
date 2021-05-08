import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import { withCookies } from "react-cookie";

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
    console.log(event.target.value);
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
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
        onHide={() => this.setState({ modelShow: false })}
        style={{ background: "rgba(0,0,0,0.2)" }}
        className="fade"
      >
        <Modal.Header closeButton>Edit license or certification</Modal.Header>
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
              ormat={"YYYY/MM/DD"}
              id="issue_date"
              value={this.state.credentials.issue_date}
              label="Issue Date"
              name="issue_date"
              onChange={this.inputChanged}
              required
              defaultValue="0000-00-00"
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
              defaultValue={"2017-05-2"}
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
              Save
            </Button>
          ) : (
            <React.Fragment>
              <Button
                onClick={this.deleteModalDisplay}
                style={save_button}
                type="submit"
                className="mr-auto"
              >
                Delete
              </Button>
              <Button
                onClick={this.editLicense}
                style={save_button}
                type="submit"
                className="ml-auto"
              >
                save
              </Button>
            </React.Fragment>
          )}
        </Modal.Footer>
        {this.state.deleteModalShow ? (
          <Modal
            show={this.state.deleteModalShow}
            size="small"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => this.setState({ deleteModalShow: false })}
            style={{ background: "rgba(0,0,0,0.3)" }}
            className="fade"
          >
            <Modal.Header closeButton>
              Delete license or certification
            </Modal.Header>

            <Modal.Body>
              <span>Are you sure you want to delete {this.state.credentials.name} ?</span>
              <Modal.Footer>
                <Button
                  onClick={() => this.setState({ deleteModalShow: false })}
                  style={save_button}
                  type="submit"
                >
                  No Thanks
                </Button>
                <Button
                  onClick={this.deleteLicense}
                  style={save_button}
                  type="submit"
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal.Body>
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

export default withCookies(License);
