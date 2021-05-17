import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Modal } from "react-bootstrap";
import CameraAltRoundedIcon from "@material-ui/icons/CameraAltRounded";
import { Avatar, Button } from "@material-ui/core";
import "./AddProfilePic.css";
import { withCookies } from "react-cookie";

export class AddProfilePic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalCoverShow: this.props.modalCoverShow,
      modalCoverDelete: false,
      cover_pic: this.props.cover_pic,
      cover_picAsFile: null,
    };
  }

  removeImage = () => {
    this.setState({
      modalCoverDelete: true,
    });
  };

  handleCoverPic = () => {
    // console.log(window.location.origin + "/images/user.svg");
    var form_data = new FormData();

    if (this.state.cover_picAsFile) {
      form_data.set(
        "cover_pic",
        this.state.cover_picAsFile,
        this.state.cover_picAsFile.name
      );
    }
    console.log(this.props.cookies.get("auth-token").token);
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
        this.setState({ modalCoverShow: false });
        window.location.reload();
        console.log("response", res);
      })
      .catch((err) => console.log(err));
  };

  handleDelete = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/uapi/users/${
        this.props.cookies.get("auth-token").user.id
      }/delete_cover_pic/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ modalCoverDelete: false, modalCoverShow: false });
        window.location.reload();
        console.log("response", res);
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(
      this.props.cover_pic.split("/")[
        this.props.cover_pic.split("/").length - 2
      ]
    );
    return (
      <div className="p-auto">
        <Modal
          style={{
            height: "700px",
          }}
          scrollable={true}
          show={this.state.modalCoverShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => this.setState({ modalCoverShow: false })}
        >
          <Modal.Header
            closeButton
            autoFocus
            style={{ borderBottom: "0 none" }}
            // onClick={() => this.setState({ modalCoverShow: false })}
          >
            <Modal.Title
              style={{
                fontSize: "1.2rem",
              }}
              id="contained-modal-title-vcenter"
            >
              <span>Cover Photo</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              className="m-auto"
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
              src={this.state.cover_pic}
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
                    cover_pic: URL.createObjectURL(e.target.files[0]),
                    cover_picAsFile: e.target.files[0],
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
                style={{ marginLeft: "10px" }}
              />
              <div>
                <span>Add Photo</span>
              </div>
            </label>
            <div className="mr-auto ml-3">
              {this.props.cover_pic.split("/")[
                this.props.cover_pic.split("/").length - 2
              ] != "defaults" ? (
                <React.Fragment>
                  <DeleteIcon className="ml-2" onClick={this.removeImage} />
                  <div>
                    <span>Delete</span>
                  </div>
                </React.Fragment>
              ) : null}
            </div>
            <Button onClick={this.handleCoverPic} style={post_button}>
              Upload Photo
            </Button>
          </Modal.Footer>
        </Modal>
        {this.state.cover_pic ? (
          <Modal
            show={this.state.modalCoverDelete}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={() => this.setState({ modalCoverDelete: false })}
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
                  Are you sure you want to remove this cover picture from
                  LinkedIn?
                </span>
              </div>
              <Modal.Footer>
                <Button
                  onClick={() => this.setState({ modalCoverDelete: false })}
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
  marginTop: "-10px",
  paddingLeft: "10px",
  paddingRight: "10px",
  marginLeft: "10px",
  fontWeight: "bold",
  borderRadius: "50px",
  fontSize: "15px",
  // display: "flex",
  background: "#0c66c2",
  color: "white",
  border: "solid 1px #0c66c2",
  //   width: "110px",
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
