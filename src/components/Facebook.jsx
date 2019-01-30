import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { RetriveUser } from '../redux/actions/SocialAuth';

export class Facebook extends React.Component {
  FacebookLoginResponse = (accessToken) => {
    const BaseURL = 'https://ah-backend-poseidon-staging.herokuapp.com/api/auth/convert-token?grant_type=convert_token';
    const backend = 'facebook';
    const clientId = 'uIDXbOR317VHiIbITZ5HiMkkcDFbZbFilQJLlxAd';
    const clientSecret = 'JaffmlmglT1OlfCQhhagvRHVdg0CIEa5x27pDM279SB9AG9JHAjWKZt8MXxiVqg7FV6gCrl2IAJjS20j0vkmXslikZ1YVhoSq5I9Xjnf8du5zd0z19H5DRSa5VvN6ZH0';
    return new Promise((resolve, reject) => {
      fetch(`${BaseURL}&client_id=${clientId}&client_secret=${clientSecret}&backend=${backend}&token=${accessToken.accessToken}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .catch((error) => {
          reject(error);
        })
        .then(response => RetriveUser(response));
    });
  }

  render() {
    return (
      <FacebookLogin
        appId="708091699572484"
        autoLoad
        fields="name,email,picture"
        callback={this.FacebookLoginResponse}
        icon="fa-facebook"
      />
    );
  }
}

export default (Facebook);
