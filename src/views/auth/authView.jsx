import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import 'msg-notify/dist/notify.css';
import notify from 'msg-notify';
import PropTypes from 'prop-types';
import SignUpForm from '../../components/auth';
import { API } from '../../constants';
import postDataThunkNoHeader from '../../redux/thunks';
import {
  signUpActionCreatorSuccess,
  signUpActionCreatorFailure
} from '../../redux/actions/authentication';
import CircularProgressLoader from '../../components/progress';

class AuthView extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    isSignUp: true,
    isResetPassword: true,
    addNewPassword: true,
    loader: {
      success: false,
      loading: false
    }
  };

  componentWillReceiveProps(nextProps) {
    const { signUpData, signUpErrors } = nextProps;

    if (signUpData || signUpErrors) {
      signUpData
        ? this.redirectOnSuccesfullLogin(signUpData)
        : notify(this.extractError(signUpErrors.errors).toString(), 'error');
      this.setState({ loader: { loading: false } });
    }
  }

  redirectOnSuccesfullLogin = (nextProps) => {
    const message = nextProps.Message
      // eslint-disable-next-line no-multi-str
      || 'You have succesfully Logged into Authorz Haven\
    success';
    localStorage.setItem('user', nextProps.token);
    localStorage.setItem('username', nextProps.username);
    notify(message, 'success');
    if (!nextProps.Message) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.history.push('/');
    }

    this.setState({ loader: { loading: false } });
  };

  changeToResetPassword = () => {
    // event.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.history.push('/reset-password')
    ;
  };

  extractError = errors => {
    const errs = Object.keys(errors).map(key => errors[key]);
    return errs && errs.length > 1 ? errs[0] : errs;
  };

  handleChangeFormStatus = event => {
    event.preventDefault();
    const { isSignUp } = this.state;
    const newStatus = !isSignUp;
    this.setState({ isSignUp: newStatus });
  };

  handleLogin = event => {
    event.preventDefault();

    const {
      postDataThunkNoHeader,
      signUpActionCreatorSuccess,
      signUpActionCreatorFailure
    } = this.props;

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    postDataThunkNoHeader(
      API.LOGIN_URL,
      {
        user: {
          username,
          password
        }
      },
      signUpActionCreatorSuccess,
      signUpActionCreatorFailure,
      'post'
    );

    this.setState({ loader: { loading: true } });
  };

  handleSignup = event => {
    event.preventDefault();
    const {
      postDataThunkNoHeader,
      signUpActionCreatorSuccess,
      signUpActionCreatorFailure
    } = this.props;

    const username = event.target.elements.username.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    postDataThunkNoHeader(
      API.SIGN_UP_URL,
      {
        user: {
          username,
          email,
          password
        }
      },
      signUpActionCreatorSuccess,
      signUpActionCreatorFailure,
      'post'
    );
    this.setState({ loader: { loading: true } });
  };

  renderInput = (
    htmlFor,
    label,
    name,
    type,
    id,
    className,
    placeHolder,
    title,
    required,
    autoFocus,
    pattern
  ) => (
      <div className="form-label-group">
        <label htmlFor={htmlFor}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          className={className}
          placeholder={placeHolder}
          pattern={pattern}
          title={title}
          required={required}
          autoFocus={autoFocus}
        />
      </div>
    );

  render() {
    const { loader, errors, isSignUp } = this.state;
    const onSubmit = isSignUp ? this.handleSignup : this.handleLogin;
    const title = isSignUp ? 'Sign Up' : 'Log In';
    const buttonName = isSignUp ? 'Sign Up' : 'Log In';
    return (
      <Fragment>
        <CircularProgressLoader {...loader} />
        <SignUpForm
          onSubmit={onSubmit}
          {...this.state}
          isSignUp={isSignUp}
          isResetPassword={this.state.isResetPassword}
          addNewPassword={this.state.addNewPassword}
          errors={errors}
          handleLogin={this.handleChangeFormStatus}
          renderInput={this.renderInput}
          changeToResetPassword={this.changeToResetPassword}
          title={title}
          buttonName={buttonName}
        />
      </Fragment>
    );
  }
}

AuthView.propTypes = {
  postDataThunkNoHeader: PropTypes.func.isRequired,
  signUpActionCreatorSuccess: PropTypes.func.isRequired,
  signUpActionCreatorFailure: PropTypes.func.isRequired,
  signUpData: PropTypes.shape({
    Message: PropTypes.string,
    token: PropTypes.string
  }),
  signUpErrors: PropTypes.shape({
    errors: PropTypes.shape()
  })
};

AuthView.defaultProps = {
  signUpErrors: {},
  signUpData: {}
};

const actionCreators = {
  postDataThunkNoHeader,
  signUpActionCreatorSuccess,
  signUpActionCreatorFailure
};
const mapStateToProps = state => ({
  signUpData: state.authReducer.signUpSuccess,
  signUpErrors: state.authReducer.signUpFailure,
  auth: state.loginreducer
});

export { AuthView as AuthViewTest };

export default connect(
  mapStateToProps,
  actionCreators
)(AuthView);
