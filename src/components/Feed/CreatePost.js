import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { withCookies } from "react-cookie";

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
    } else {
      form_data.append("image", null);
    }

    console.log(form_data);
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
    // this.state.modalPost = this.props.modalPost;
    console.log(this.props.modalPost, this.state.modalPost);
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
            onClick={() => {
              this.setState({ modalPost: false });
            }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              Create a Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros.
              </p> */}
            <input
              placeholder="What do you want to talk about?"
              // value={this.state.body}
              onChange={this.handleBody}
            />
            {this.state.image ? (
              <img className="post__image" src={this.state.image} />
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={this.state.body.length < 1}
              type="submit"
              onClick={this.submitPost}
            >
              Post
            </Button>
            <input
              type="file"
              id="file"
              // value={this.state.image}

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
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withCookies(CreatePost);
