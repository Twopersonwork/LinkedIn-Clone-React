import React, { Component } from "react";
import LikeShow from "./LikeShow";
import { Modal, Row, Col, ListGroup } from "react-bootstrap";

class Count extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      show: false,
      usernames: [],
    };
  }

  componentDidMount() {
    for (var i = 0; i < this.props.likes.length; i++) {
      console.log(this.props.likes[i].user);
      fetch(`http://127.0.0.1:8000/uapi/users/${this.props.likes[i].user}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token d194a979f94b27587f743071a64f8d5c7d3dfb01",
        },
      })
        .then((resp) => resp.json())
        // .then((resp) => console.log(resp.username))
        .then((resp) => {
          var joined = this.state.usernames.concat([resp.username]);
          this.setState({ usernames: joined }, console.log("joined", joined));
        }, console.log("usernames ", this.state.usernames))
        .catch((error) => console.log(error));
    }
  }

  // componentDidMount() {
  //   this.LikeInfo(this.state.user);
  // }
  // LikeInfo=(id)=>{
  //   fetch(`http://127.0.0.1:8000/uapi/users/${id}/`,{
  //     method:'GET',
  //     headers:{
  //       "Content-Type": "application/json",
  //       Authorization: "Token d194a979f94b27587f743071a64f8d5c7d3dfb01",
  //     },
  //   }).then(resp=>resp.json())
  //   .then(resp=>[resp.username].concat(this.state.usernames),this.setState({show:true}))
  // }

  // LikeInfo = (id) => {
  //   fetch(`http://127.0.0.1:8000/uapi/users/${id}/`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Token d194a979f94b27587f743071a64f8d5c7d3dfb01",
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then(
  //       (res) => [res.username].concat(this.state.usernames),
  //       this.setState({ show: true })
  //     )
  //     .catch((error) => console.log(error));
  // };

  modalShow = () => {
    this.setState({ show: true });
  };

  render() {
    const { likes, comments, no_of_like, no_of_comment } = this.props;
    console.log(likes);

    return (
      <div>
        <button onClick={this.modalShow}>{no_of_like}</button>

        {this.state.show ? (
          <Modal
            show={this.state.show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header
              closeButton
              onClick={() => {
                this.setState({ show: false });
              }}
            >
              <Modal.Title id="contained-modal-title-vcenter">
                Reactions
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.usernames.map((username) => (
                <h4>{username}</h4>
              ))}
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default Count;
