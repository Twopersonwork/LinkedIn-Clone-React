import InputOption from "./InputOption";
// import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import React, { Component } from "react";
import Count from "./Count";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      firstName: "",
      lastName: "",
      profile_pic: null,
    };
  }
  fetchUser = (id) => {
    fetch(`http://127.0.0.1:8000/uapi/users/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token d194a979f94b27587f743071a64f8d5c7d3dfb01",
      },
    })
      .then((resp) => resp.json())
      .then((res) =>
        this.setState(
          {
            user: res.username,
            firstName: res.first_name,
            lastName: res.last_name,
            profile_pic: res.profile_pic,
          },
          console.log(this.state.user)
        )
      )
      .catch((error) => console.log(error));
  };
  componentDidMount() {
    this.fetchUser(this.props.user);
  }

  render() {
    const {
      body,
      user,
      image,
      likes,
      comments,
      no_of_like,
      no_of_comment,
    } = this.props;

    return (
      <div className="post">
        <div className="post__header">
          {this.state.profile_pic ? (
            <Avatar src={this.state.profile_pic} alt="Profile" />
          ) : (
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP9xCw-TO3d5DvvvTaUE2dx6VLYNO52xxG5A&usqp=CAU"
              alt="Profile"
            />
          )}
          {/* {this.fetchUser(user)} */}

          <div className="post__info">
            <span style={{ fontWeight: "bold" }}>{this.state.user}</span>
            <br />
            <span className="text-muted" style={{ fontSize: "17px" }}>
              {this.state.firstName}
            </span>
            <span className="text-muted ml-1" style={{ fontSize: "17px" }}>
              {this.state.lastName}
            </span>
          </div>
        </div>

        <div className="post__body">
          <p>{body}</p>
          <img className="post__image" src={image} />
          <Count
            likes={likes}
            comments={comments}
            no_of_like={no_of_like}
            no_of_comment={no_of_comment}
          />
        </div>
        <div className="post__buttons">
          <InputOption Icon={ThumbUpIcon} title="Like" color="gray" />
          <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
          <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
          <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
        </div>
      </div>
    );
  }
}

export default Post;

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
