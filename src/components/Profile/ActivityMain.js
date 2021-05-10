import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withCookies } from "react-cookie";
import FlipMove from "react-flip-move";
import Post from "../Feed/Post";

class ActivityMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_activity_btn: true,
      post_btn: false,
      posts: [],
      activities_id:[],
      activities:[],
    };
  }

  handleActivity = () => {
    this.setState({ all_activity_btn: true, post_btn: false });
  };

  getActivity = () => {
    for (let index = 0; index < this.state.activities_id.length; index++) {
      fetch(
        `${process.env.REACT_APP_API_URL}/papi/posts/${this.state.activities_id[index].post}/`,
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
          console.log(resp);
          var joined = this.state.activities.concat([resp]);
          this.setState({ activities: joined });
        })
        .catch((error) => console.log(error));
    }
  };

  handlePost = () => {
    this.setState({ post_btn: true, all_activity_btn: false });
  };

  getPost = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/uapi/users/${
        this.props.cookies.get("auth-token").user.id
      }/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState(
          {
            posts: resp.posts,
            activities_id:resp.activities,
          },
          function () {
            this.getActivity();
          }
        );
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getPost();
  }

  render() {
    return (
      <div className="feed">
        <div className="feed__inputContainer">
          <div>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                paddingLeft: "10px",
              }}
            >
              Malav's Activity
            </span>
          </div>
          <div style={{ display: "flex" }} className="mt-2">
            <Button
              style={this.state.all_activity_btn ? Active_btn : non_Active_btn}
              onClick={this.handleActivity}
            >
              All activity
            </Button>
            <Button
              style={this.state.post_btn ? Active_btn : non_Active_btn}
              onClick={this.handlePost}
            >
              Post
            </Button>
          </div>
          
        </div>
        <hr />

        {/* Posts */}
        <FlipMove>
          {this.state.post_btn &&
            this.state.posts.length > 0 &&
            this.state.posts.map((post) => <Post key={post.id} post={post} />)}
        </FlipMove>
        <FlipMove>
          {this.state.all_activity_btn &&
            this.state.activities.length > 0 &&
            this.state.activities.map((post) => (
              <Post key={post.id} post={post} />
            ))}
        </FlipMove>
      </div>
    );
  }
}

const Active_btn = {
  paddingLeft: "20px",
  paddingRight: "20px",
  marginTop: "10px",
  marginLeft: "10px",
  fontWeight: "bold",
  borderRadius: "50px",
  display: "flex",
  background: "#2E7742",
  color: "white",
  border: "solid 1px #0c66c2",
};

const non_Active_btn = {
  paddingLeft: "20px",
  paddingRight: "20px",
  marginTop: "10px",
  marginLeft: "10px",
  fontWeight: "bold",
  borderRadius: "50px",
  display: "flex",
  background: "white",
  color: "grey",
  border: "solid 1px black",
};
export default withCookies(ActivityMain);
