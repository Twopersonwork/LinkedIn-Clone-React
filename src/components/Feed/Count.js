import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import "./Count.css";
import { withCookies } from "react-cookie";

class Count extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      show: false,
      users: [],
      showLike: false,
      showComment: false,
      userComment: [],
      comments: [],
      likes: this.props.post.no_of_like,
    };
  }

  // componentDidMount() {
  //   for (var i = 0; i < this.props.likes.length; i++) {
  //     console.log(this.props.likes[i].user);
  //     fetch(`http://127.0.0.1:8000/uapi//${this.props.likes[i].user}/`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Token d194a979f94b27587f743071a64f8d5c7d3dfb01",
  //       },
  //     })
  //       .then((resp) => resp.json())
  //       // .then((resp) => console.log(resp.username))
  //       .then((resp) => {
  //         var joined = this.state.users.concat([resp]);
  //         this.setState({ users: joined }, console.log("joined", joined));
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // }

  modalShowLike = () => {
    this.setState({ users: [] });

    for (var i = 0; i < this.props.post.likes.length; i++) {
      console.log(this.props.post.likes[i].user);
      fetch(
        `http://127.0.0.1:8000/uapi/users/${this.props.post.likes[i].user}/`,
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
        .then((resp) => {
          var joined = this.state.users.concat([resp]);
          this.setState({ users: joined }, console.log("joined", joined));
        })
        .catch((error) => console.log(error));
    }

    this.setState({ show: true, showLike: true });
  };

  modalShowComment = () => {
    this.FetchComment();
    this.setState({ showComment: !this.state.showComment });
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log("this prop", this.props.post.no_of_like);
    // console.log("prev", prevProps.post.no_of_like);
    // if(prevProps.post.no_of_like!=this.props.no_of_like){
    // }
  }

  render() {
    const { post } = this.props;
    {
      post.comments.map((comment) => {
        this.state.comments.concat([comment.comment]);
      });
    }

    return (
      <div>
        <button onClick={this.modalShowLike}>{post.no_of_like}</button>
        <button onClick={this.modalShowComment}>{post.no_of_comment}</button>
        {this.state.showComment &&
          post.comments.map((comment) => (
            <div className="user">
              <div className="user__header">
                <h4>{post.comment.user}</h4>
                {post.comment.user.profile_pic ? (
                  <Avatar src={post.comment.user.profile_pic} alt="Profile" />
                ) : (
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP9xCw-TO3d5DvvvTaUE2dx6VLYNO52xxG5A&usqp=CAU"
                    alt="Profile"
                  />
                )}
                <span className="ml-2" style={{ fontWeight: "bold" }}>
                  {post.comment.comment}
                </span>
              </div>
              <hr />
            </div>
          ))}

        {post.likes.length > 0 && this.state.show ? (
          <Modal
            style={{
              height: "500px",
            }}
            scrollable={true}
            show={this.state.show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header
              closeButton
              onClick={() => {
                this.setState({
                  show: false,

                  showLike: false,
                });
              }}
            >
              <Modal.Title id="contained-modal-title-vcenter">
                Likes
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.users.map((user) => (
                <div className="user">
                  <div className="user__header">
                    {user.profile_pic ? (
                      <Avatar src={user.profile_pic} alt="Profile" />
                    ) : (
                      <Avatar
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP9xCw-TO3d5DvvvTaUE2dx6VLYNO52xxG5A&usqp=CAU"
                        alt="Profile"
                      />
                    )}
                    <span className="ml-2" style={{ fontWeight: "bold" }}>
                      {user.username}
                    </span>
                  </div>
                  <hr />
                </div>
              ))}
            </Modal.Body>
            {/* <Modal.Footer></Modal.Footer> */}
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default withCookies(Count);
