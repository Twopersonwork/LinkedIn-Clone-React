import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { withCookies } from "react-cookie";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import "./CreatePost.css";
import { Avatar } from "@material-ui/core";

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
        });

        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Modal
          scrollable={true}
          show={this.state.modalPost}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            onClick={() => this.setState({ modalPost: false })}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              Create a Post
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
                  {this.props.cookies.get("auth-token").user.username}
                </div>
              </Form.Label>
              <Form.Control
                style={{ border: "none" }}
                placeholder="What do you want to talk about?"
                onChange={this.handleBody}
                as="textarea"
                rows={3}
              />
            </Form.Group>

            {this.state.image ? (
              <img className="post__image" src={this.state.image} />
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
            <label htmlFor="file">
              <InsertPhotoIcon style={{ color: "gray" }} />
            </label>
            <Button
              style={{
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
              }}
              disabled={this.state.body.length < 1}
              type="submit"
              onClick={this.submitPost}
            >
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withCookies(CreatePost);
