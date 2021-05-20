import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Modal, Button } from "react-bootstrap";
import CameraAltRoundedIcon from "@material-ui/icons/CameraAltRounded";
import { Avatar } from "@material-ui/core";
import "./AddProfilePic.css";
import { withCookies } from "react-cookie";

export class AddProfilePic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: true,
      modalDelete: false,
      profile_pic: this.props.profile_pic,
      profile_picAsFile: this.props.profile_picAsFile,
    };
  }

  removeImage = () => {
    this.setState({
      modalDelete: true,
    });
  };

  handleProfilePic = () => {
    // console.log(window.location.origin + "/images/user.svg");
    var form_data = new FormData();

    if (this.state.profile_picAsFile) {
      form_data.set(
        "profile_pic",
        this.state.profile_picAsFile,
        this.state.profile_picAsFile.name
      );
    }
    console.log(this.state.profile_picAsFile);
    fetch(
      `${process.env.REACT_APP_API_URL}/uapi/users/${
        this.props.cookies.get("auth-token").user.id
      }/update_user/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
        body: form_data,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ modalShow: false });
        window.location.reload();
        console.log("response", res);
      })
      .catch((err) => console.log(err));
  };

  handleDelete = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/uapi/users/${
        this.props.cookies.get("auth-token").user.id
      }/delete_profile_pic/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ modalDelete: false, modalShow: false });
        window.location.reload();
        console.log("response", res);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="p-auto">
        <Modal
          className="my-modal"
          style={{
            height: "700px",
            color: "white",
          }}
          scrollable={true}
          show={this.state.modalShow}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => this.setState({ modalShow: false })}
        >
          <Modal.Header
            closeButton
            autoFocus
            style={{ borderBottom: "0 none", color: "white" }}
            // onClick={() => this.setState({ modalShow: false })}
          >
            <Modal.Title
              style={{
                fontSize: "1.2rem",
                color: "white",
              }}
              id="contained-modal-title-vcenter"
            >
              <span>Profile Photo</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Avatar
              className="m-auto"
              style={{ width: "250px", height: "250px", borderRadius: "50%" }}
              src={this.state.profile_pic}
              alt="Profile"
            />
          </Modal.Body>

          <Modal.Footer style={{ borderTopColor: "gray" }}>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={(e) =>
                this.setState(
                  {
                    profile_pic: URL.createObjectURL(e.target.files[0]),
                    profile_picAsFile: e.target.files[0],
                  },
                  function () {
                    console.log(
                      "file",
                      e.target.files[0],
                      URL.createObjectURL(e.target.files[0])
                    );
                  }
                )
              }
            />
            <label htmlFor="file">
              <CameraAltRoundedIcon
                className="ml-4"
                style={{ color: "white", marginLeft: "10px" }}
              />
              <div>
                <span>Add Photo</span>
              </div>
            </label>
            <div className="mr-auto ml-3">
              {this.props.profile_pic.split("/")[
                this.props.profile_pic.split("/").length - 2
              ] != "defaults" ? (
                <React.Fragment>
                  <DeleteIcon className="ml-2" onClick={this.removeImage} />
                  <div>
                    <span>Delete</span>
                  </div>
                </React.Fragment>
              ) : null}
            </div>
            <Button onClick={this.handleProfilePic} style={post_button}>
              <span style={{ fontWeight: "bold" }}>Upload Photo</span>
            </Button>
          </Modal.Footer>
        </Modal>
        {this.state.modalDelete ? (
          <Modal
            show={this.state.modalDelete}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={() => this.setState({ modalDelete: false })}
            style={{
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <Modal.Header closeButton autoFocus>
              Delete?
            </Modal.Header>

            <Modal.Body
              style={{
                padding: "0px",
                borderRadius: "60px",
              }}
            >
              <div className="m-auto p-2 pb-3">
                <span
                  style={{
                    fontSize: "0.8rem",
                    lineHeight: "0.5",
                    color: "rgba(0,0,0,0.6)",
                  }}
                >
                  Are you sure you want to remove this profile picture from
                  LinkedIn?
                </span>
              </div>
              <Modal.Footer>
                <Button
                  onClick={() => this.setState({ modalDelete: false })}
                  style={cancel_button}
                  type="submit"
                >
                  Cancel
                </Button>
                <Button
                  onClick={this.handleDelete}
                  style={delete_button}
                  type="submit"
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </Modal>
        ) : null}
      </div>
    );
  }
}
const post_button = {
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
  fontSize: "18px",
};
const delete_button = {
  paddingLeft: "20px",
  paddingRight: "20px",
  marginTop: "10px",
  marginLeft: "5px",
  fontWeight: "bold",
  borderRadius: "50px",
  display: "flex",
  background: "#0c66c2",
  color: "white",
  border: "solid 1px #0c66c2",
  fontSize: "16px",
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

export default withCookies(AddProfilePic);
