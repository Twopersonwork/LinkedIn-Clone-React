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
import { Button, Modal } from "react-bootstrap";
import EditPost from "./EditPost";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

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
      editPost: false,
      anchorEl: null,
      modalPost: false,
      deleteModal: false,
    };
  }
  moreOptions = (e) => {
    console.log("more clicked");
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  handleEdit = () => {
    this.setState({ modalPost: true });
    this.handleClose();
  };
  modalDelete = () => {
    this.setState({ deleteModal: true });
    this.handleClose();
  };
  handleDelete = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/papi/posts/${this.props.post.id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
      }
    )
      .then((resp) => {
        console.log(this.props.activityDelete);
        if (this.props.activityDelete) {
          this.props.activityUpdate();

          this.setState({ deleteModal: false });
        } else {
          this.props.updatePost();
        }
      })

      .catch((error) => console.log(error));
    this.handleClose();
  };
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
        (e) => e.user === this.props.cookies.get("auth-token").user.id
      )
    ) {
      this.setState({ has_liked: true });
    }
  }
  // to instantly getting the comments and likes w/o refreshing
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.has_liked !== this.state.has_liked ||
      prevState.has_commented !== this.state.has_commented
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
          <MoreHorizIcon
            style={{ marginLeft: "auto", color: "gray" }}
            onClick={(e) => this.moreOptions(e)}
          />
          <Menu
            style={{ borderRadius: "50%" }}
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "bottom",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div className="p-1">
              <MenuItem onClick={this.handleEdit}>
                <EditOutlinedIcon style={{ color: "gray" }} className="mr-2" />
                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                  Edit Post
                </span>
              </MenuItem>
              <MenuItem onClick={this.modalDelete}>
                <DeleteIcon style={{ color: "gray" }} className="mr-2" />
                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                  Delete Post
                </span>
              </MenuItem>
            </div>
            {/* <MenuItem onClick={this.handleClose}>Logout</MenuItem> */}
          </Menu>
          {this.state.deleteModal ? (
            <Modal
              show={this.state.deleteModal}
              size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              onHide={() => this.setState({ deleteModal: false })}
              style={{
                background: "rgba(0,0,0,0.3)",
              }}
              className="fade"
            >
              <Modal.Header style={{ margin: "auto", borderBottom: "0 none" }}>
                Delete Post?
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
                    Are you sure you want to permanently remove this post from
                    LinkedIn?
                  </span>
                </div>
                <Modal.Footer style={{ padding: "0px", paddingBottom: "5px" }}>
                  <Button
                    onClick={() => this.setState({ deleteModal: false })}
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
          {this.state.modalPost ? (
            <Link
              component={() => (
                <EditPost
                  post={post}
                  closemodalPost={(e) => this.setState({ modalPost: e })}
                />
              )}
            />
          ) : null}
        </div>

        <div className="post__body">
          <p>{post.body}</p>
          <img className="post__image" src={post.image} alt="" />

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

        {this.state.editPost ? <EditPost /> : null}
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
