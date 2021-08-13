import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { withCookies } from "react-cookie";
import { BiTrash } from "react-icons/bi";

class EditSkill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: true,
      user: this.props.cookies.get("auth-token").user.id,
      credentials: this.props.SkillCredentials,
    };
  }

  deleteSkill = (id) => {
    // console.log(id);
    fetch(`${process.env.REACT_APP_API_URL}/profile/skills/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
      },
    })
      .then((resp) => {
        // console.log(resp);
        this.props.updateSkills();
      })

      .catch((error) => console.log(error));
  };

  render() {
    // console.log(this.props.SkillCredentials);
    return (
      <Modal
        show={this.state.modalShow}
        size="large"
        aria-labelledby="contained-modal-title-vcenter"
        //   centered
        onHide={() => this.setState({ modalShow: false })}
        style={{ background: "rgba(0,0,0,0.3)" }}
        className="fade"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "1.2rem" }}>
            <span>Edit Skills</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.credentials.map((cred) => (
            <div>
              <div style={{ display: "flex" }}>
                <span style={{ fontSize: "20px" }}>{cred.skill}</span>
                <BiTrash
                  className="ml-auto mt-2"
                  onClick={() => this.deleteSkill(cred.id)}
                />
              </div>
              <hr></hr>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={save_button}
            type="submit"
            onClick={() => this.setState({ modalShow: false })}
          >
            <span style={{ fontWeight: "bold" }}>Save</span>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const save_button = {
  paddingLeft: "20px",
  paddingRight: "20px",
  marginTop: "10px",
  marginLeft: "10px",
  fontWeight: "bold",
  borderRadius: "50px",
  display: "flex",
  background: "#0c66c2",
  color: "white",
  border: "solid 1px #0c66c2",
};

export default withCookies(EditSkill);
