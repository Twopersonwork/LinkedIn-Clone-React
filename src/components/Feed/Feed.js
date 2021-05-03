import "./Feed.css";
import InputOption from "./InputOption";
import Post from "./Post";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import { Modal, Button } from "react-bootstrap";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import axios from "axios";

// import { useSelector } from 'react-redux';
// import { selectUser } from '../../features/userSlice';
// import { db } from '../../firebase';
// import firebase from "firebase";
import FlipMove from "react-flip-move";

import React, { Component } from "react";

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      posts: [],
      modalPost: false,
      body: "",
      image: "",
      imageAsFile: null,
    };
  }

  submitPost = () => {
    let form_data = new FormData();

    form_data.append(
      "image",
      this.state.imageAsFile,
      this.state.imageAsFile.name
    );
    form_data.append("body", this.state.body);
    form_data.append("user", 1);
    let url = `${process.env.REACT_APP_API_URL}/papi/posts/`;
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Token d194a979f94b27587f743071a64f8d5c7d3dfb01",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  createPost = () => {
    this.setState(
      {
        modalPost: true,
      },
      console.log(this.state.modalPost)
    );
  };

  handleBody = (e) =>
    this.setState({ body: e.target.value }, function () {
      console.log(this.state.body);
    });

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/papi/posts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token d194a979f94b27587f743071a64f8d5c7d3dfb01",
      },
    })
      .then((resp) => resp.json())
      .then((res) =>
        this.setState(
          {
            posts: res,
          },
          console.log(this.state.posts)
        )
      )
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="feed">
        <div className="feed__inputContainer">
          {/* <div className="feed__input"> */}
          {/* <CreateIcon /> */}
          {/* <form>
              <input
                value={this.state.input}
                onChange={(e) => this.setState({ input: e.target.value })}
                type="text"
                placeholder="Start a post"
              /> */}
          {/* <button onClick={sendPost} type="submit">Send</button> */}
          {/* </form> */}
          <button onClick={this.createPost} className="feed__input">
            Start a Post
          </button>
          {/* </div> */}
          <div className="feed__inputOptions">
            <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
            <InputOption
              Icon={SubscriptionsIcon}
              title="Video"
              color="#7FC15E"
            />
            <InputOption Icon={EventNoteIcon} title="Event" color="#E7A33E" />
            <InputOption
              Icon={CalendarViewDayIcon}
              title="Write article"
              color="#F5987E"
            />
          </div>
        </div>
        <hr />

        {/* Posts */}
        <FlipMove>
          {this.state.posts.map((post) => (
            <Post
              key={post.id}
              body={post.body}
              // description={description}
              // message={message}
              user={post.user}
              image={post.image}
              no_of_like={post.no_of_like}
              no_of_comment={post.no_of_comment}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </FlipMove>

        {this.state.modalPost ? (
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
        ) : null}
      </div>
    );
  }
}

export default Feed;
