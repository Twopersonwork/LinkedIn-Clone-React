import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class ContactInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: true,
    };
  }

  onHide = () => {
    this.setState({ modalShow: false });
    this.props.onContactChange(false);
  };
  render() {
    return (
      <div>
        <Modal
          show={this.state.modalShow}
          size="md"
          //   aria-labelledby="contained-modal-title-vcenter"
          //   centered
          onHide={this.onHide}
        >
          <Modal.Header closeButton>Followers</Modal.Header>
          <Modal.Body className="profile__modal">
            {this.props.user.email}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ContactInfo;
