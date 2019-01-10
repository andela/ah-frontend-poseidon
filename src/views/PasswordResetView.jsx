import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import SignUpForm from '../components/auth';
import postDataThunkNoHeader, { postDataThunk } from '../redux/thunks';
import { signUpActionCreatorSuccess, signUpActionCreatorFailure } from '../redux/actions/authentication';
import CircularProgressLoader from '../components/progress';

class PasswordResetView extends React.Component {
    state = {
      isResetPassword: true,
      addNewPassword: true,
      isSignUp: true,
      loader: {
        success: false,
        loading: false,
      },
    }

    componentWillReceiveProps(nextProps) {
      const { signUpData, signUpErrors } = nextProps;
      signUpData 
        ? this.redirectOnSuccesfullPasswordReset(signUpData) 
        : notify.show(signUpErrors.user.detail, 'error', 4000);
      this.setState({ loader: { loading: false } });
    }

    componentDidMount = () => {
      if (window.location.href.includes('password-reset')) {
        this.setState({ addNewPassword: false });
        localStorage.setItem('user', this.props.match.params.token);
      } 
      else {
        this.setState({ isResetPassword: false });
      }
    }

      redirectOnSuccesfullPasswordReset = nextProps => {
        notify.show(nextProps.Message, "success", 4000);
        if (nextProps.Message==="Your password has been updated succesfully") {
          this.props.history.push("/signup");
        }}

       handleResetSubmit = (e) => { 
         e.preventDefault();
         const {
           postDataThunkNoHeader,
           signUpActionCreatorSuccess,
           signUpActionCreatorFailure,
         } = this.props;

         const email = e.target.elements.email.value;
        
         postDataThunkNoHeader('password-reset/', {
           user: {
             email,
           },
         }, signUpActionCreatorSuccess, signUpActionCreatorFailure, 'post');
         this.setState({ loader: { loading: true } });
       };
      
       handleNewPasswordSubmit=(e) => {
         e.preventDefault();
        
         const {
           postDataThunk,
           signUpActionCreatorSuccess,
         } = this.props;

         const password = e.target.elements.password.value;
         postDataThunk('password/reset/done/', {
           user: {
             password,
           },
         }, signUpActionCreatorSuccess, 'put');
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
          pattern,
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
          const { isResetPassword, addNewPassword, isSignUp } = this.state;
          const buttonName = !isResetPassword ? 'Send Link' : 'Reset Password';
          const title = !isResetPassword ? 'Enter Email to recieve reset link' : 'Enter New Password';
          const handleSubmit = !isResetPassword ? this.handleResetSubmit : this.handleNewPasswordSubmit;
          const { loader } = this.state;
          return (
            <Fragment>
              <CircularProgressLoader
                {...loader}
              />
              <SignUpForm
                onChange={this.onChange}
                onSubmit={handleSubmit}
                isResetPassword={isResetPassword}
                changeToResetPassword={this.changeToResetPassword}
                addNewPassword={addNewPassword}
                isSignUp={isSignUp}
                buttonName={buttonName}
                title={title}
                renderInput={this.renderInput}
              />
            </Fragment>
          );
        }
}

const actionCreators = {
  postDataThunkNoHeader,
  postDataThunk,
  signUpActionCreatorSuccess,
  signUpActionCreatorFailure,
};
const mapStateToProps = state => ({
  signUpData: state.authReducer.signUpSuccess,
  signUpErrors: state.authReducer.signUpFailure,
});

export default connect(mapStateToProps, actionCreators)(PasswordResetView);
export { PasswordResetView as PasswordTest };
