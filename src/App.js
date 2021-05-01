import './App.css';

import React, { Component } from 'react'
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Feed from './components/Feed/Feed';
import Widgets from './components/Widgets/Widgets';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div>
        {/* <Login/> */}
        <div className ="app">
          <Header/>
          <div className="app__body">
            <Sidebar />
            <Feed/>
            <Widgets/>
          </div>
        </div>
      </div>
    )
  }
}

export default App

