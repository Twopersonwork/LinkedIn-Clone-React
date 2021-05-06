import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import "./Count.css";
import { withCookies } from "react-cookie";
import Comments from "./Comments";

class Count extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_users: [],
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
  // fetch(`http://127.0.0.1:8000/uapi/users/`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((resp) => resp.json())
  //   .then((res) =>
  //     this.setState({
  //       all_users: res,
  //     })
  //   )
  //   .catch((error) => console.log(error));
  //   this.fetchUser = (id) => {
  //     fetch(`http://127.0.0.1:8000/uapi/users/${id}/`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((resp) => resp.json())
  //       .then((res) =>
  //         this.setState({
  //           user: res,
  //         })
  //       )
  //       .catch((error) => console.log(error));
  //   };
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
          this.setState({ users: joined });
        })
        .catch((error) => console.log(error));
    }

    this.setState({ show: true, showLike: true });
  };

  modalShowComment = () => {
    // this.FetchComment();
    this.setState({ showComment: !this.state.showComment });
  };

  render() {
    const { post } = this.props;

    return (
      <div className="count">
        <div className="links">
          <img
            className="reaction_icons"
            src="https://image.pngaaa.com/38/3989038-small.png"
          />
          <img
            className="reaction_icons"
            src="https://www.userflow.nl/images/Linkedin-Support-Icon-HeartinHand500.png"
          />
          {/* <img
            className="reaction_icons"
            src="https://image.pngaaa.com/82/3989082-middle.png"
          /> */}
          <img
            className="reaction_icons"
            src="https://www.userflow.nl/images/Linkedin-Celebrate-Icon-ClappingHands500.png"
          />

          <a className="button" onClick={this.modalShowLike}>
            {post.no_of_like}
          </a>

          <a className="button" onClick={this.modalShowComment}>
            {post.no_of_comment}
          </a>
        </div>

        <hr className="hr" />
        {this.state.showComment &&
          post.comments.map((comment) => <Comments comment={comment} />)}
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
