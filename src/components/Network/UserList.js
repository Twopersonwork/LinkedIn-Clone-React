import React, { Component } from "react";
import { withCookies } from "react-cookie";
import UserCards from "./UserCards";
import { Container, Grid } from "@material-ui/core";
import { trackPromise } from "react-promise-tracker";
import FlipMove from "react-flip-move";

export class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resp_user: [],
      users: [],
    };
  }

  componentDidMount() {
    trackPromise(
      fetch(`${process.env.REACT_APP_API_URL}/uapi/userDetail/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          this.setState({ resp_user: resp }, function () {
            var copy = [];
            for (var i = 0; i < this.state.resp_user.length; i++) {
              if (
                this.props.user.id !== this.state.resp_user[i].id &&
                !this.props.followers.some(
                  (e) => e.user_id === this.state.resp_user[i].id
                ) &&
                !this.props.following.some(
                  (e) => e.following_user_id === this.state.resp_user[i].id
                )
                // &&
                // !this.props.waitFollowers.some(
                //   (e) => e.user_id === this.state.resp_user[i].id
                // )
              ) {
                copy.push(this.state.resp_user[i]);
              }
            }
            this.setState({ users: copy });
          });
        })
    ).catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="network__inputContainer">
        <span className="pl-1">People you may know</span>
        <Container style={{ padding: "0px", marginTop: "10px" }}>
          <Grid container>
            <Grid item>
              <FlipMove>
                {this.state.users.map((user) => (
                  <UserCards key={user.id} user={user} />
                ))}
              </FlipMove>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withCookies(UserList);
