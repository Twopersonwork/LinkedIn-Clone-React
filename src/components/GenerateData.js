import React, { Component } from "react";
import { withCookies } from "react-cookie";

export class GenerateData extends Component {
  submitPost = () => {
    for (let index = 0; index < 10; index++) {
      var form_data = new FormData();

      form_data.set("body", `post-${index}`);

      // console.log(this.props.cookies.get("auth-token").token);
      fetch(`${process.env.REACT_APP_API_URL}/papi/create_post/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
        body: form_data,
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    }
  };

  componentDidMount() {
    this.submitPost();
  }

  render() {
    return <div></div>;
  }
}

export default withCookies(GenerateData);
