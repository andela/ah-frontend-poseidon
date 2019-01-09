import React, { Component } from 'react';
import Routes from './routes/index';
import './App.scss';
import Notification from 'react-notify-toast';

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
