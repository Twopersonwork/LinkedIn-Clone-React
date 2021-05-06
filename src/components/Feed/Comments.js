import React, { Component } from "react";
import { Avatar } from "@material-ui/core";

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
    };
  }
  componentDidMount() {
    this.fetchUser(this.props.comment.user);
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
      <div className="user">
        <div className="user__header">
          {/* <h4>{this.fetchUser(this.props.comment.user)}</h4> */}
          {this.state.user.profile_pic ? (
            <Avatar src={this.state.user.profile_pic} alt="Profile" />
          ) : (
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP9xCw-TO3d5DvvvTaUE2dx6VLYNO52xxG5A&usqp=CAU"
              alt="Profile"
            />
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
        <hr />
      </div>
    );
  }
}

export default Comments;
