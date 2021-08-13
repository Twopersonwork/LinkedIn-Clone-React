import React, { Component } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import Widgets from "./components/Widgets/Widgets";
import Register from "./components/Register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import "./App.css";
import { withCookies } from "react-cookie";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import ActivityLeft from "./components/Profile/ActivityLeft";
import ActivityMain from "./components/Profile/ActivityMain";
import GenerateData from "./components/GenerateData";
import Network from "./components/Network/Network";
import NetworkLeft from "./components/Network/NetworkLeft";
import UserContext from "./components/userContext";
import OtherUserProfile from "./components/Profile/OtherUserProfile";
import ProfileRight from "./components/Profile/ProfileRight";

class App extends Component {
  constructor(props) {
    super(props);
    // console.log(process.env);

    this.state = {
      user: [],
      c: [],
    };
  }

  updateNework = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/uapi/users/${
        this.props.cookies.get("auth-token").user.id
      }/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.cookies.get("auth-token").token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState({ user: resp });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    if (this.props.cookies.get("auth-token")) {
      this.updateNework();
    }
  }

  render() {
    const { user, c } = this.state;

    return (
      <UserContext.Provider value={{ user, c }}>
        <BrowserRouter>
          <div>
            <Switch>
              {this.props.cookies.get("auth-token") ? (
                <Route>
                  <div className="app">
                    <Header />

                    {/*  To generate multiple post at a time (Devlopement purpose) */}
                    {/* <GenerateData /> */}
                    <div className="app__body">
                      <Route exact path="/">
                        <Sidebar />
                        <Feed />
                        <Widgets />
                      </Route>
                      <Route
                        exact
                        path="/profile"
                        component={(props) => (
                          <React.Fragment>
                            <Profile />
                            <ProfileRight {...props} />
                          </React.Fragment>
                        )}
                      ></Route>
                      <Route
                        exact
                        path="/user_profile"
                        component={(props) => <OtherUserProfile {...props} />}
                      />
                      <Route
                        exact
                        path="/activity"
                        component={(props) => (
                          <React.Fragment>
                            <ActivityLeft {...props} />
                            <ActivityMain {...props} />
                          </React.Fragment>
                        )}
                      />

                      <Route exact path="/network">
                        <NetworkLeft />
                        <Network updateNework={this.updateNework} />
                      </Route>
                    </div>
                  </div>
                </Route>
              ) : (
                <React.Fragment>
                  <Route exact path="/home" component={() => <Home />} />
                  <Route
                    exact
                    path="/login"
                    render={(props) => <Login {...props} />}
                  />
                  <Route
                    exact
                    path="/join_now"
                    component={() => <Register />}
                  />
                  <Route exact path="/" component={() => <Home />} />
                </React.Fragment>
              )}
            </Switch>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default withCookies(App);
