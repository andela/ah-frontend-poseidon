import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import logo from './logo.svg';
import './App.scss';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { PostData } from './views/PostData';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.singUp = this.singUp.bind(this);
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
    if (this.state.redirect || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/login'} />);
    }
    const responseGoogle = (response) => {
      console.log(response);
      this.singUp(response, 'facebook');
    };
    const responseFacebook = (response) => {
      console.log(response);
      this.singUp(response, 'google');
    };
    return (
      <div className="App">
        <header className="App-header">
          <FacebookLogin
            appId="329746837629256"
            autoLoad={true}
            fields="name,email,picture"
            // onClick={componentClicked}
            callback={responseFacebook}
          />
          <GoogleLogin
            clientId="112800644277-pgj3k7s5lk4u05k9c7qilputa07pts7v.apps.googleusercontent.com"
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
