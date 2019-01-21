import React, { Component } from 'react';
import './App.scss';
import Notification from 'react-notify-toast';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Routes from "./routes";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faThumbsUp,
  faThumbsDown, faUserCircle 
} from "@fortawesome/free-solid-svg-icons";

library.add(faThumbsUp, faThumbsDown, faUserCircle) ;
require('dotenv').config();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Notification />
        <Routes />
      </div>
    );
  }
}

export default App;
