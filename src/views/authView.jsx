import React, { Fragment } from "react";
import PropTypes from "prop-types";
import SignUpForm from "../components/auth";
// import { Redirect } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateUsername
} from "../utils/validation";
import { capitalizeWord } from "../utils";
import { API } from "../constants";
import { authAction } from "../redux/actions/authentication";
import { connect } from "react-redux";
// import CircularProgressLoader from "../components/progress";
// import { PostData } from '../redux/actions/authentication/SocialAuthentication';

class AuthView extends React.Component {
  validators = {
    validateUsername,
    validateEmail,
    validatePassword
  };

  initialState = {
    username: "",
    email: "",
    password: "",
    errors: {
      username: "",
      email: "",
      password: ""
    },
    isSignUp: false,
    loader: {
      success: false,
      loading: false
    }
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  // componentWillReceiveProps(nextProps, nextContext) {
  //   const { auth } = nextProps;
  //   const { user, errors } = auth;
  //   if (!!user || !!errors) {
  //     console.log(!!user ? user : errors);
  //     this.setState({ loader: { loading: false } });
  //   }
  // }

  formHasError = () => {
    const { username, email, password } = this.state;
    return !!(
      validateUsername(username) ||
      (this.props.isSignUp && validateEmail(email)) ||
      validatePassword(password)
    );
  };

  onChange = event => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: this.validators[`validate${capitalizeWord(name)}`](value)
      }
    }));
  };
// redirects to the home page
  onSubmit = async event => {
    event.preventDefault();

    if (!this.formHasError()) {
      if (this.props.isSignUp === true) {
        await this.props.authAction(this.state, API.SIGN_UP_URL);
        // this.setState({ loader: { loading: true } });
      } else {
        await this.props.authAction(this.state, API.LOGIN_URL);
        this.setState(prevState => ({
          errors: { ...prevState.errors, ...this.props.errors },
          ...this.props.history.push("/")
        }));
      }
    }
  };

  // onSuccess(response) {
  //   response.json().then(body => {
  //     alert(JSON.stringify(body));
  //   });
  // }

  // onFailed(error) {
  //   alert(error);
  // }

  // singUp(res, type) {
  //   let postData;
  //   // lets get email from facebook
  //   if (type === 'facebook' && res.email) {
  //     // lets get data from the provider
  //     postData = {
  //       name: res.name,
  //       provider: type,
  //       email: res.email,
  //       provider_id: res.id,
  //       token: res.accessToken,
  //       provider_pic: res.picture.data.url,
  //     };
  //   }
  //   if (type === 'google' && res.w3.U3) {
  //     postData = {
  //       name: res.w3.ig,
  //       provider: type,
  //       email: res.w3.U3,
  //       provider_id: res.El,
  //       token: res.Zi.access_token,
  //       provider_pic: res.w3.Paa,
  //     };
  //   }
  //   if (postData) {
  //     PostData('signup', postData).then((result) => {
  //       const responseJson = result;
  //       sessionStorage.setItem('userData', JSON.stringify(responseJson));
  //       this.setState({ redirect: true });
  //     });
  //   } else { }
  // }

  render() {
    const { loader } = this.state;

    return (
      <Fragment>
        {/* <CircularProgressLoader {...loader} /> */}
        <SignUpForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          {...this.state}
          isSignUp={this.props.isSignUp}
          formHasError={this.formHasError}
        />
      </Fragment>
    );
  }
}

AuthView.propTypes = {
  isSignUp: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { authAction }
)(AuthView);
