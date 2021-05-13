import React, { Component } from "react";
import { Avatar, Button } from "@material-ui/core";
import { withCookies } from "react-cookie";
import UserCards from "./UserCards";
import { Container, Grid } from "@material-ui/core";

export class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resp_user: [],
      users: [],
    };
  }

  componentDidMount() {
    console.log("wait", this.props.waitFollowers);
    console.log("wait", this.props.followers);

    console.log("wait", this.props.following);

    fetch(`http://127.0.0.1:8000/uapi/userDetail/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState({ resp_user: resp }, function () {
          //   console.log(this.state.resp_user);
          var copy = [];
          for (var i = 0; i < this.state.resp_user.length; i++) {
            if (
              this.props.user.id != this.state.resp_user[i].id &&
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

            // console.log(
            //   this.state.resp_user[i].id,
            //   !this.props.followers.some(
            //     (e) => e.user_id === this.state.resp_user[i].id
            //   ),
            //   !this.props.following.some(
            //     (e) => e.following_user_id === this.state.resp_user[i].id
            //   ),
            //   !this.props.waitFollowers.some(
            //     (e) => e.user_id === this.state.resp_user[i].id
            //   )
            // );
          }
          this.setState({ users: copy });
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log(this.state.users);
    return (
      <div className="network__inputContainer">
        <span className="pl-1">Industry leaders in India you may know</span>
        <Container style={{ padding: "0px", marginTop: "10px" }}>
          <Grid container>
            <Grid item>
              {this.state.users.map((user) => (
                <UserCards key={user.id} user={user} />
              ))}
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withCookies(UserList);
