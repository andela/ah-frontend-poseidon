import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import logo from './logo.svg';
import './App.scss';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
// import TwitterLogin from 'react-twitter-auth/lib/react-twitter-auth-component.js';
import { PostData } from './src/views/PostData';

class App extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.singUp = this.singUp.bind(this);
    this.onFailed = this.onFailed.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess(response) {
    response.json().then(body => {
      alert(JSON.stringify(body));
    });
  }

  onFailed(error) {
    alert(error);
  }

  singUp(res, type) {
    let postData;
    // lets get email from facebook
    if (type === 'facebook' && res.email) {
      // lets get data from the provider
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url,
      };
    }
    if (type === 'google' && res.w3.U3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa,
      };
    }
    if (postData) {
      PostData('signup', postData).then((result) => {
        const responseJson = result;
        sessionStorage.setItem('userData', JSON.stringify(responseJson));
        this.setState({ redirect: true });
      });
    } else { }
  }

  render() {
    // if (this.state.redirect || sessionStorage.getItem('userData')) {
    //   return (<Redirect to={'/users/login'} />);
    // }
    const customHeader = {};
    customHeader['Test'] = 'test-header';
    const responseGoogle = (response) => {
      console.log(response);
      this.singUp(response, 'google');
    };
    const responseFacebook = (response) => {
      console.log(response);
      this.singUp(response, 'facebook');
    };
    return (
      <div className="App">
        <header className="App-header">
          <TwitterLogin loginUrl="https://ah-backend-poseidon-staging.herokuapp.com/api/v1/auth/twitter"
            onFailure={this.onFailed}
            onSuccess={this.onSuccess}
            requestTokenUrl="https://ah-backend-poseidon-staging.herokuapp.com/api/v1/auth/twitter/reverse"
          />

          <FacebookLogin
            appId="329746837629256"
            autoLoad={true}
            fields="name,email,picture"
            // onClick={componentClicked}
            callback={responseFacebook}
          />
          <GoogleLogin
            clientId="551942160281-e1td5gll4pgdji9unfrk513al314tcc8.apps.googleusercontent.com"
            // buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </header>
      </div>
    );
  }
}

export default App;
