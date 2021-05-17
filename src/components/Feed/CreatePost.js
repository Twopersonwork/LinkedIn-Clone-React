import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { withCookies } from "react-cookie";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import "./CreatePost.css";
import { Avatar } from "@material-ui/core";
import { AiFillCloseCircle } from "react-icons/ai";
export class CreatePost extends Component {
  constructor(props) {
    super(props);
    console.log("caallledd");
    this.state = {
      modalPost: true,
      body: "",
      image: "",
      imageAsFile: null,
    };
  }
  removeImage = () => {
    console.log("clicked");
    this.setState({
      image: "",
      imageAsFile: null,
    });
  };

  handleBody = (e) =>
    this.setState({ body: e.target.value }, function () {
      console.log(this.state.body);
    });

  submitPost = () => {
    var form_data = new FormData();

    form_data.set("body", this.state.body);
    if (this.state.imageAsFile) {
      form_data.set(
        "image",
        this.state.imageAsFile,
        this.state.imageAsFile.name
      );
    }

    console.log(this.props.cookies.get("auth-token").token);
    fetch(`${process.env.REACT_APP_API_URL}/papi/create_post/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
      body: form_data,
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ modalPost: false }, function () {
          window.location.reload();
          this.props.closemodalPost(false);
        });

        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Modal
          style={{
            height: "700px",
          }}
          scrollable={true}
          show={this.state.modalPost}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => this.setState({ modalPost: false })}
        >
          <Modal.Header closeButton autoFocus>
            <Modal.Title
              style={{
                fontSize: "1.2rem",
              }}
              id="contained-modal-title-vcenter"
            >
              <span>Create a post</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>
                <div className="post__header">
                  {this.props.cookies.get("auth-token").user.profile_pic ? (
                    <Avatar
                      src={
                        this.props.cookies.get("auth-token").user.profile_pic
                      }
                      alt="Profile"
                    />
                  ) : (
                    <Avatar
                      className="post__image"
                      src="/images/user.svg"
                      alt="Profile"
                    />
                  )}
                  <span className="ml-2" style={{ fontWeight: "bold" }}>
                    {this.props.cookies.get("auth-token").user.username}
                  </span>
                </div>
              </Form.Label>
              <span>
                <Form.Control
                  style={{ border: "none", color: "black", fontSize: "18px" }}
                  placeholder="What do you want to talk about?"
                  onChange={this.handleBody}
                  as="textarea"
                  rows={3}
                />
              </span>
            </Form.Group>

            {this.state.image ? (
              <React.Fragment>
                <div className="img_wrp">
                  <img
                    className="post__image"
                    style={{ borderRadius: "10px" }}
                    src={this.state.image}
                    alt=""
                  />
                  <AiFillCloseCircle
                    className="close__image"
                    onClick={this.removeImage}
                  />
                  {/* <Icon  /> */}
                </div>
              </React.Fragment>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={(e) =>
                this.setState({
                  image: URL.createObjectURL(e.target.files[0]),
                  imageAsFile: e.target.files[0],
                })
              }
            />
            <label className="mr-auto" htmlFor="file">
              <InsertPhotoIcon style={{ color: "gray" }} />
            </label>
            <Button
              style={post_button}
              disabled={this.state.body.length < 1}
              type="submit"
              onClick={this.submitPost}
            >
              <span style={{ fontWeight: "bold" }}>Post</span>
            </Button>
          </Modal.Footer>
        </Modal>
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
};

export default withCookies(CreatePost);
