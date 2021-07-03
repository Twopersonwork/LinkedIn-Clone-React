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
      anchorEl: false,
    };
  }

  componentDidMount() {
    this.fetchUser(this.props.comment.user);
    if (
      this.props.post.likes.some(
        (e) => e.user === this.props.cookies.get("auth-token").user.id
      )
    ) {
      this.setState({ has_commented: true });
    }
  }
  moreOptions = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  fetchUser = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/uapi/users/${id}/`, {
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
        <div className="comment">
          <div className="comment__header">
            {this.state.user.profile_pic ? (
              <Avatar src={this.state.user.profile_pic} alt="Profile" />
            ) : (
              <Avatar src="/images/user.svg" alt="Profile" />
            )}
            <div className="comment__info">
              <div class="option_wrp">
                <div>
                  <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                    {this.state.user.username}
                  </span>

                  <br />
                  <div className="mt-2">
                    <span
                      className="wrap"
                      style={{
                        fontSize: "18px",
                      }}
                    >
                      {this.props.comment.comment}
                    </span>
                  </div>
                  {/* reseverd for future use */}
                  {/* <MoreHorizIcon onClick={(e) => this.moreOptions(e)} />
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                  </Menu> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withCookies(Comments);
