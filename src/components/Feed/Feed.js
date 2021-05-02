import "./Feed.css";
import InputOption from "./InputOption";
import Post from "./Post";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../features/userSlice';
// import { db } from '../../firebase';
// import firebase from "firebase";
// import FlipMove from "react-flip-move";

import React, { Component } from "react";

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
    };
  }

  render() {
    return (
      <div className="feed">
        <div className="feed__inputContainer">
          <div className="feed__input">
            <CreateIcon />
            <form>
              <input
                value={this.state.input}
                onChange={(e) => this.setState({ input: e.target.value })}
                type="text"
                placeholder="Start a post"
              />
              {/* <button onClick={sendPost} type="submit">Send</button> */}
            </form>
          </div>
          <div className="feed__inputOptions">
            <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
            <InputOption
              Icon={SubscriptionsIcon}
              title="Video"
              color="#7FC15E"
            />
            <InputOption Icon={EventNoteIcon} title="Event" color="#E7A33E" />
            <InputOption
              Icon={CalendarViewDayIcon}
              title="Write article"
              color="#F5987E"
            />
          </div>
        </div>
        <hr />

        {/* Posts */}
        {/* <FlipMove>
                {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
                    <Post
                        key={id}
                        name={name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}
                    />
                ))}
            </FlipMove> */}

        <Post
          name="Your name"
          description="This is a test "
          message="I hope this is working"
        />
      </div>
    );
  }
}

export default Feed;
