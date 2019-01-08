import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <h1>Please Login</h1>
          <input placeholder="Enter Email" type="text" name="email" />
          <br />
          <input placeholder="Enter Password" type="password" name="password" />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>

    );
  }
}

export default Login;
