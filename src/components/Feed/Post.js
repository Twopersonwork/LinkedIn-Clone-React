import InputOption from "./InputOption";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import React, { Component } from "react";
import Count from "./Count";
import { withCookies } from "react-cookie";
import Comments from "./Comments";
import { Button } from "react-bootstrap";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      has_liked: false,
      has_commented: false,
      post: this.props.post,
      showComment: false,
      comment: "",
      user_commented: false,
    };
  }
  handleComment = (e) => {
    console.log(e.target.value);
    this.setState({ comment: e.target.value });
  };
  submitComment = () => {
    this.setState({ has_commented: false });
    fetch(`http://127.0.0.1:8000/papi/posts/${this.props.post.id}/comment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
      body: JSON.stringify({
        comment: this.state.comment,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.result) {
          this.setState({ has_commented: true, user_commented: true });
        }
      })

      .catch((error) => console.log(error));
    this.setState({
      comment: "",
    });
  };
  submitLike = () => {
    if (!this.state.has_liked) {
      fetch(
        `http://127.0.0.1:8000/papi/posts/${this.props.post.id}/likePost/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${
              this.props.cookies.get("auth-token").token
            }`,
          },
        }
      )
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.result) {
            this.setState({
              has_liked: true,
            });
          }
        })
        .catch((errors) => console.log(errors));
    } else {
      fetch(
        `http://127.0.0.1:8000/papi/posts/${this.props.post.id}/dislikePost/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${
              this.props.cookies.get("auth-token").token
            }`,
          },
        }
      )
        .then(() => {
          this.setState({ has_liked: false });
        })
        .catch((errors) => console.log(errors));
    }
  };

  fetchUser = (id) => {
    fetch(`http://127.0.0.1:8000/uapi/users/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((res) =>
        this.setState({
          user: res,
        })
      )
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    // will highlight like blue if current use has liked the post
    this.fetchUser(this.props.post.user);
    if (
      this.props.post.likes.some(
        (e) => e.user == this.props.cookies.get("auth-token").user.id
      )
    ) {
      this.state.has_liked = true;
    }
  }
  // to instantly getting the comments and likes w/o refreshing
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.has_liked != this.state.has_liked ||
      prevState.has_commented != this.state.has_commented
    ) {
      fetch(
        `${process.env.REACT_APP_API_URL}/papi/posts/${this.props.post.id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${
              this.props.cookies.get("auth-token").token
            }`,
          },
        }
      )
        .then((resp) => resp.json())
        .then((res) =>
          this.setState({
            post: res,
          })
        )
        .catch((error) => console.log(error));
    }
  }
  modalShowComment = () => {
    this.setState({ showComment: !this.state.showComment });
  };
  render() {
    const { post } = this.props;

    return (
      <div className="post">
        <div className="post__header">
          {this.state.user.profile_pic ? (
            <Avatar src={this.state.user.profile_pic} alt="Profile" />
          ) : (
            <Avatar
              className="post__image"
              src="/images/user.svg"
              alt="Profile"
            />
          )}

          <div className="post__info">
            <span style={{ fontWeight: "bold" }}>
              {this.state.user.username}
            </span>
            <br />
            <span className="text-muted" style={{ fontSize: "17px" }}>
              {this.state.user.firstName}
            </span>
            <span className="text-muted ml-1" style={{ fontSize: "17px" }}>
              {this.state.user.lastName}
            </span>
          </div>
        </div>

        <div className="post__body">
          <p>{post.body}</p>
          <img className="post__image" src={post.image} />

          <Count
            post={this.state.post}
            modalShowComment={this.modalShowComment}
          />
        </div>
        <div className="post__buttons">
          <InputOption
            function={this.submitLike}
            Icon={ThumbUpIcon}
            title="Like"
            color={this.state.has_liked ? "blue" : "gray"}
            post={post}
          />
          <InputOption
            Icon={ChatOutlinedIcon}
            function={this.modalShowComment}
            title="Comment"
            color="gray"
          />
          <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
          <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
        </div>

        {this.state.showComment ? (
          <div style={{ display: "flex" }} className="mt-3">
            {this.state.user.profile_pic ? (
              <Avatar src={this.state.user.profile_pic} alt="Profile" />
            ) : (
              <Avatar src="/images/user.svg" alt="Profile" />
            )}

            <input
              placeholder="Add a comment..."
              value={this.state.comment}
              onChange={(e) => this.handleComment(e)}
              style={{ width: "100%", marginLeft: "10px", outline: "none" }}
              className="feed__input"
            />
            {this.state.comment.length > 0 ? (
              <Button style={post_button} onClick={this.submitComment}>
                Post
              </Button>
            ) : null}
          </div>
        ) : null}
        {this.state.showComment &&
          this.state.post.comments.map((comment) => (
            <Comments
              key={comment.id}
              post={this.state.post}
              comment={comment}
            />
          ))}
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
  // display: "flex",
  background: "#0c66c2",
  color: "white",
  border: "solid 1px #0c66c2",
  width: "110px",
};

export default withCookies(Post);

// const Post =  forwardRef (({name,description, message, photoUrl}, ref) => {
//     return (
//         <div ref ={ref} className ='post'>
//         <div className="post__header">
//             <Avatar className="mt-1" src="https://img.republicworld.com/republic-prod/stories/promolarge/xxhdpi/sdwpmnu8jc7dl86x_1613127617.jpeg">{name[0]}</Avatar>
//             <div className="post__info">
//                 <span style={{fontWeight:"bold"}}>{name}</span><br/>
//                 <span className="text-muted" style={{fontSize:"17px"}}>{description}</span>
//             </div>
//         </div>

//          <div className="post__body">
//              <p>{message}</p>
//          </div>
//          <div className="post__buttons">
//              <InputOption Icon = {ThumbUpIcon}  title ="Like" color ="gray"/>
//              <InputOption Icon = {ChatOutlinedIcon}  title ="Comment" color ="gray"/>
//              <InputOption Icon = {ShareOutlinedIcon}  title ="Share" color ="gray"/>
//              <InputOption Icon = {SendOutlinedIcon}  title ="Send" color ="gray"/>
//          </div>
//         </div>
//     )
// })

// export default Post;
