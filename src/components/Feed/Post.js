import InputOption from "./InputOption";
// import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

import React, { Component } from "react";

export class Post extends Component {
  render() {
    return (
      <div ref={ref} className="post">
        <div className="post__header">
          <Avatar
            className="mt-1"
            src="https://img.republicworld.com/republic-prod/stories/promolarge/xxhdpi/sdwpmnu8jc7dl86x_1613127617.jpeg"
          >
            {name[0]}
          </Avatar>
          <div className="post__info">
            <span style={{ fontWeight: "bold" }}>{name}</span>
            <br />
            <span className="text-muted" style={{ fontSize: "17px" }}>
              {description}
            </span>
          </div>
        </div>

        <div className="post__body">
          <p>{message}</p>
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
