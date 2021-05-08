import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import "./Comments.css";
import { withCookies } from "react-cookie";

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      has_commented: false,
    };
  }

  componentDidMount() {
    this.fetchUser(this.props.comment.user);
    if (
      this.props.post.likes.some(
        (e) => e.user == this.props.cookies.get("auth-token").user.id
      )
    ) {
      this.state.has_commented = true;
    }
  }

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

  render() {
    return (
      <React.Fragment>
        {this.state.user.username !=
        this.props.cookies.get("auth-token").user.username ? (
          <div className="user">
            <div className="comment__header">
              {/* <h4>{this.fetchUser(this.props.comment.user)}</h4> */}
              {this.state.user.profile_pic ? (
                <Avatar src={this.state.user.profile_pic} alt="Profile" />
              ) : (
                <Avatar src="/images/user.svg" alt="Profile" />
              )}
              <div className="post__info">
                <span style={{ fontWeight: "bold" }}>
                  {this.state.user.username}
                </span>
                <br />
                <span className="text-muted" style={{ fontSize: "17px" }}>
                  {this.props.comment.comment}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="user">
            <div className="user__header">
              {/* <h4>{this.fetchUser(this.props.comment.user)}</h4> */}
              {this.state.user.profile_pic ? (
                <Avatar src={this.state.user.profile_pic} alt="Profile" />
              ) : (
                <Avatar src="/images/user.svg" alt="Profile" />
              )}
              <div className="auth__comment__header">
                <span style={{ fontWeight: "bold" }}>
                  {this.state.user.username}
                </span>
                <br />
                <span className="text-muted" style={{ fontSize: "17px" }}>
                  {this.props.comment.comment}
                </span>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withCookies(Comments);
