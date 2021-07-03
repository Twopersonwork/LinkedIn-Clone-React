import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Modal, Button } from "react-bootstrap";
import { withCookies } from "react-cookie";
import { Autocomplete } from "@material-ui/lab";
import "./AddSkills.css";

class AddSkills extends Component {
  constructor(props) {
    super(props);
    this.textField = React.createRef();

    this.state = {
      modalShow: true,
      skills: [],
      placeholder: "Add Skills",
      user: this.props.cookies.get("auth-token").user.id,
    };
  }

  handle = (e, v) => {
    this.setState(
      {
        skills: v,
      },
      function () {
        // console.log(this.state.skills);
        if (this.state.skills.length > 0) {
          this.setState({ placeholder: "" });
        }
      }
    );
  };

  AddSkill = (e) => {
    for (let index = 0; index < this.state.skills.length; index++) {
      // console.log(this.state.skills);
      fetch(`${process.env.REACT_APP_API_URL}/profile/skills/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
        body: JSON.stringify({
          skill: this.state.skills[index]["skill"],
          user: this.state.user,
        }),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          // console.log(resp);
          //   this.props.cookies.set("license-id", resp.id);
          this.props.updateSkills();
        })
        .catch((error) => console.log(error));

      e.preventDefault();
      this.props.onSkillModal(false);
    }
  };

  render() {
    return (
      <div>
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
              <span>Add Skills</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Autocomplete
              multiple
              id="tags-standard"
              options={skillsName}
              getOptionLabel={(option) => option.skill}
              onChange={this.handle}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  id="list"
                  ref={this.textField}
                  placeholder={this.state.placeholder}
                  value={this.state.skills}
                />
              )}
            />
            <Modal.Footer>
              <Button onClick={this.AddSkill} style={save_button} type="submit">
                <span style={{ fontWeight: "bold" }}>Add</span>
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
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

const skillsName = [
  { skill: "HTML" },
  { skill: "Scrum" },
  { skill: "CSS" },
  { skill: "JavaScript" },
  { skill: "CSS tools" },
  { skill: "Photoshop" },
  { skill: "NodeJS" },
  { skill: "Go" },
  { skill: "Java" },
  { skill: "Python" },
  { skill: "Test-driven development" },
  { skill: "Scrum" },
  { skill: "Machine Learning" },
  { skill: "Data Science" },
  { skill: "Deep Learnig" },
  { skill: "Natural Language Processing" },
  { skill: "Django" },
  { skill: "Django REST Framework" },
  { skill: "Flask" },
  { skill: "Spring" },
  { skill: "Hibernate" },
  { skill: "Cloud Computing" },
  { skill: "Virtualization" },
  { skill: "Scala" },
  { skill: "Apache spark" },
  { skill: "Cyber Security" },
  { skill: "Github" },
  { skill: "Linux" },
  { skill: "Databases" },
  { skill: "Data structures" },
  { skill: "Data Analysis" },
  { skill: "Software Development" },
  { skill: "Software Development Life cycle" },
  { skill: "Software Development Manager" },
  { skill: "Social Media Marketing" },
  { skill: "Gitlab" },
  { skill: "Slack" },
  { skill: "UI/UX Design" },
  { skill: "Docker" },
  { skill: "Redis" },
  { skill: "Jira" },
  { skill: "Scrum" },
  { skill: "PostgreSQL" },
  { skill: "React" },
  { skill: "Node" },
  { skill: "Agile" },
  { skill: "Problem Solving" },
  { skill: "Object Oriendted Programming" },
];

export default withCookies(AddSkills);
