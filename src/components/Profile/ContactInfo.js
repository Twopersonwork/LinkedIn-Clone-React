import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import MailTwoToneIcon from "@material-ui/icons/MailTwoTone";

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
    // console.log(this.props);
    return (
      <div>
        <Modal
          style={{
            height: "500px",
          }}
          scrollable={true}
          show={this.state.modalShow}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          onHide={this.onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontSize: "1.2rem",
              }}
            >
              {this.props.user.firstName ? (
                <span>
                  {this.props.user.firstName} {this.props.user.lastName}
                </span>
              ) : (
                <span>{this.props.user.username}</span>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="profile__modal">
            <div className="pb-3">
              <span
                style={{
                  fontSize: "1.2rem",
                }}
              >
                Contact Info
              </span>
            </div>
            <div style={{ display: "flex" }}>
              <MailTwoToneIcon className="mt-1" />
              <span
                style={{
                  fontSize: "23px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                Email
              </span>
            </div>
            {/* {this.props.user} */}

            <span style={{ marginLeft: "40px" }}>{this.props.email}</span>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ContactInfo;
