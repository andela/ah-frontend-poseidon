import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import SignUpForm from '../components/auth';
import { API } from '../constants';
import { postDataThunkNoHeader } from '../redux/thunks';
import { signUpActionCreatorSuccess, signUpActionCreatorFailure } from '../redux/actions/authentication';
import CircularProgressLoader from '../components/progress';

class AuthView extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    loader: {
      success: false,
      loading: false,
    },
  };

  // constructor(props) {
  //   super(props);
  //   this.state = this.initialState;
  // }

  componentWillReceiveProps(nextProps) {
    const { signUpData, signUpErrors } = nextProps;
    if (signUpData || signUpErrors) {
      // eslint-disable-next-line
      signUpData
        ? notify.show(signUpData.Message, 'success', 6000)
        : notify.show(this.extractError(signUpErrors.errors), 'error', 4000);
      this.setState({ loader: { loading: false } });
    }
  }

  extractError = (errors) => {
    const errs = Object.keys(errors).map(key => errors[key]);
    return errs && errs.length > 1 ? errs[0] : errs;
  };

  onSubmit = (event) => {
    event.preventDefault();
    const {
      postDataThunkNoHeader,
      signUpActionCreatorSuccess,
      signUpActionCreatorFailure,
    } = this.props;
    const username = event.target.elements.username.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    this.setState(() => ({
      username,
      email,
      password,
    }));

    postDataThunkNoHeader(API.SIGN_UP_URL, {
      user: {
        ...this.state, username, email, password,
      },
    }, signUpActionCreatorSuccess, signUpActionCreatorFailure, 'post');
    this.setState({ loader: { loading: true } });
  };

  render() {
    const { loader } = this.state;
    return (
      <Fragment>
        <CircularProgressLoader
          {...loader}
        />
        <SignUpForm
          onSubmit={this.onSubmit}
          {...this.state}
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
    token: PropTypes.string,
  }),
  signUpErrors: PropTypes.shape({
    errors: PropTypes.shape(),
  }),
};

AuthView.defaultProps = {
  signUpErrors: {},
  signUpData: {},
};

const actionCreators = {
  postDataThunkNoHeader,
  signUpActionCreatorSuccess,
  signUpActionCreatorFailure,
};
const mapStateToProps = state => ({
  signUpData: state.authReducer.signUpSuccess,
  signUpErrors: state.authReducer.signUpFailure,
});

export { AuthView as AuthViewTest };

export default connect(mapStateToProps, actionCreators)(AuthView);
