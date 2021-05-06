import "./Feed.css";
import InputOption from "./InputOption";
import Post from "./Post";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import FlipMove from "react-flip-move";
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { withCookies } from "react-cookie";
import CreatePost from "./CreatePost";
// import { Button } from "react-bootstrap";

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
    var form_data = new FormData();

    form_data.set("body", this.state.body);
    if (this.state.image) {
      form_data.set(
        "image",
        this.state.imageAsFile,
        this.state.imageAsFile.name
      );
    }

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
      })
      .catch((err) => console.log(err));
  };

  createPost = () => {
    this.setState({
      modalPost: true,
    });
  };

  handleBody = (e) => this.setState({ body: e.target.value }, function () {});

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/papi/posts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
    })
      .then((resp) => resp.json())
      .then((res) =>
        this.setState({
          posts: res,
        })
      )
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.posts.length != this.state.posts.length) {
      fetch(`${process.env.REACT_APP_API_URL}/papi/posts/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
      })
        .then((resp) => resp.json())
        .then((res) =>
          this.setState({
            posts: res,
          })
        )
        .catch((error) => console.log(error));
    }
  }

  render() {
    return (
      <div className="feed">
        <div className="feed__inputContainer">
          <button
            style={{ width: "100%" }}
            onClick={this.createPost}
            className="feed__input"
          >
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
          {this.state.posts.length > 0 &&
            this.state.posts.map((post) => <Post key={post.id} post={post} />)}
        </FlipMove>

        {this.state.modalPost ? (
          <Link component={() => <CreatePost />} />
        ) : null}
      </div>
    );
  }
}

export default withCookies(Feed);
