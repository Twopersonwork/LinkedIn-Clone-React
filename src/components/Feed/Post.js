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

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      has_liked: false,
      post: this.props.post,
    };
  }

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
    this.fetchUser(this.props.post.user);
    if (
      this.props.post.likes.some(
        (e) => e.user == this.props.cookies.get("auth-token").user.id
      )
    ) {
      this.state.has_liked = true;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.has_liked != this.state.has_liked) {
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

          <Count post={this.state.post} />
        </div>
        <div className="post__buttons">
          <InputOption
            submitLike={this.submitLike}
            Icon={ThumbUpIcon}
            title="Like"
            color={this.state.has_liked ? "blue" : "gray"}
            post={post}
          />
          <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
          <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
          <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
        </div>
      </div>
    );
  }
}

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
