
import React from 'react';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import TwitterLogin from 'react-twitter-auth';
import { PostData } from "../redux/actions/SuccessfulLogin"

export default class SocialLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: false,
            redirect: false
        };
        this.login = this.login.bind(this);
    }

    login(res, type) {
        let postData;
        if (type === 'facebook' && res.email) {
            postData = {
                name: res.name,
                provider: type,
                email: res.email,
                provider_id: res.id,
                token: res.accessToken,
                provider_pic: res.picture.data.url
            };
        }

        if (type === 'google' && res.w3.U3) {
            postData = {
                name: res.w3.ig,
                provider: type,
                email: res.w3.U3,
                provider_id: res.El,
                token: res.Zi.access_token,
                provider_pic: res.w3.Paa
            };
        }

        if (postData) {
            PostData('login', postData).then((result) => {
                let responseJson = result;
                sessionStorage.setItem("userData", JSON.stringify(responseJson));
                this.setState({ redirect: true });
            });
        } else { }
    }

    render() {

        if (this.state.redirect || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/'} />)
        }

        const responseFacebook = (response) => {
            console.log("facebook console");
            console.log(response);
            this.login(response, 'facebook');
        }

        const responseGoogle = (response) => {
            console.log("google console");
            console.log(response);
            this.login(response, 'google');
        }

        return (
            <div>
                <TwitterLogin loginUrl="https://ah-backend-poseidon-staging.herokuapp.com/api/v1/auth/twitter"
                    onFailure={this.onFailed}
                    onSuccess={this.onSuccess}
                    requestTokenUrl="https://ah-backend-poseidon-staging.herokuapp.com/api/auth/convert-token?grant_type=convert_token&client_id="
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

            </div>
        )
    }
}
