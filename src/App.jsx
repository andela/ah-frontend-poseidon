import React, { Component } from 'react';
import './App.scss';
import Notification from 'react-notify-toast';
import Routes from './routes';

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
