import React, { Component } from "react";
import { Modal } from "react-bootstrap";
// import { withCookies } from "react-cookie";
import FollowersList from "./FollowersList";

class ShowFollowers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: true,
      followers: [],
    };
  }

  onHide = () => {
    this.setState({ modelShow: false });
    this.props.onChangeFollowers(false);
  };

  componentDidMount() {
    if (this.props.followers) {
      for (let index = 0; index < this.props.followers.length; index++) {
        fetch(
          `${process.env.REACT_APP_API_URL}/uapi/userDetail/${this.props.followers[index].user_id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((resp) => resp.json())
          .then((resp) => {
            var joined = this.state.followers.concat([resp]);
            this.setState({ followers: joined });
          });
      }
    }
  }

  render() {
    // console.log(this.state.followers.length);
    return (
      <div>
        <Modal
          show={this.state.modalShow}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={this.onHide}
        >
          <Modal.Header closeButton>Followers</Modal.Header>
          <Modal.Body className="profile__modal">
            {this.state.followers &&
              this.state.followers.map((follower) => (
                <FollowersList key={follower.id} follower={follower} />
              ))}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ShowFollowers;
