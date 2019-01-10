import React from 'react';
import GoogleLogin from 'react-google-login';
import { RetriveUser } from '../redux/actions/SocialAuth';

export class Google extends React.Component {
  GoogleLoginResponse = (response) => {
    const BaseURL = 'https://ah-backend-poseidon-staging.herokuapp.com/api/auth/convert-token?grant_type=convert_token';
    const backend = 'google-oauth2';
    const clientId = 'uIDXbOR317VHiIbITZ5HiMkkcDFbZbFilQJLlxAd';
    const clientSecret = 'JaffmlmglT1OlfCQhhagvRHVdg0CIEa5x27pDM279SB9AG9JHAjWKZt8MXxiVqg7FV6gCrl2IAJjS20j0vkmXslikZ1YVhoSq5I9Xjnf8du5zd0z19H5DRSa5VvN6ZH0';
    return new Promise((resolve, reject) => {
      fetch(`${BaseURL}&client_id=${clientId}&client_secret=${clientSecret}&backend=${backend}&token=${response.Zi.access_token}`, {
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
        .then(resp => RetriveUser(resp));
    });
  }

  render() {
    return (
      <GoogleLogin
        clientId="551942160281-e1td5gll4pgdji9unfrk513al314tcc8.apps.googleusercontent.com"
        onSuccess={this.GoogleLoginResponse}
        onFailure={this.GoogleLoginResponse}
      />
    );
  }
}
export default (Google);
