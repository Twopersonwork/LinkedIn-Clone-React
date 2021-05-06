import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { withCookies } from "react-cookie";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import "./CreatePost.css";

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
            <input
              placeholder="What do you want to talk about?"
              onChange={this.handleBody}
            />
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
                this.setState(
                  {
                    image: URL.createObjectURL(e.target.files[0]),
                    imageAsFile: e.target.files[0],
                  },
                  console.log(this.state.image)
                )
              }
            />
            <label htmlFor="file">
              <InsertPhotoIcon style={{ color: "gray" }} />
            </label>
            <Button
              style={{
                // paddingLeft: "25px",
                // paddingRight: "25px",
                fontWeight: "bold",
                borderRadius: "50px",
                background: "#FFFFFF",
                color: "#0c66c2",
                // marginTop: "-100px",
                marginLeft: "12px",
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
