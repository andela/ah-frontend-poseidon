import React from 'react';
import PropTypes from 'prop-types';

const SignUpForm = (props) => {
  const {
    onSubmit,
    isSignUp,
    handleLogin,
    renderInput,
    isResetPassword,
    addNewPassword,
    changeToResetPassword,
    title,
    buttonName,
  } = props;
  return (
    <div className="page-wrapper bg-blue p-t-100 p-b-100">
      <div className="wrapper wrapper--680">
        <div className="card card-1">
          <div className="header">
            <h2 align="center">Welcome to Authors Haven</h2>
          </div>
          <div className="card-body">
            <h4 className="sign-up" align="center">
              {title}
            </h4>
            <form onSubmit={onSubmit}>
              {isResetPassword && addNewPassword && renderInput(
                'inputUsername',
                'Username',
                'username',
                'text',
                'Username',
                'form-control',
                'Username',
                'Username should be at-least 3 characters',
                true,
                true,
                '[A-z0-9\\s]{3,}',
              )}
              {isSignUp && addNewPassword
                && renderInput(
                  'inputEmail',
                  'Email',
                  'email',
                  'email',
                  'email',
                  'form-control',
                  'email',
                  'Username should be at-least 3 characters',
                  true,
                  true,
                )}
              {isResetPassword && renderInput(
                'inputPassword',
                'Password',
                'password',
                'password',
                'password',
                'form-control',
                'password',
                'Password should contain at-least one digit, one alphabet and at-least six characters long',
                true,
                true,
                '(?=.*\\d)(?=.*[A-Za-z]).{6,}',
              )}
              <div className="form-label-group">
                <button
                  type="submit"
                  name="submitButton"
                  id="submitButton"
                  className="btn btn-primary m-t-100"
                  color="primary"
                >
                  <span>{buttonName}</span>
                </button>
              </div>
            </form>
            <div className="form-label-group">
              <button
                type="link"
                className="btn btn-link m-t-100"
                color="primary"
              >
                <span>
                  {' '}
                  {isSignUp ? (
                    <div id="change-login" role="button" onClick={handleLogin}>
                      Already have an account? Log-in
                    </div>
                  ) : (
                    <div role="button" onClick={handleLogin}>
                        Don't have an account? Register
                      </div>
                  )}
                </span>
              </button>
              <div id="reset" className="btn btn-link m-t-100" type="link" color="primary" hidden={!isResetPassword || !addNewPassword} onClick={changeToResetPassword}>
                Forgot password? Click here to reset
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SignUpForm.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  handleLogin: PropTypes.func,
  renderInput: PropTypes.func,
  changeToResetPassword: PropTypes.func,
  isSignUp: PropTypes.boolean,
  isResetPassword: PropTypes.boolean,
  addNewPassword: PropTypes.boolean,
  changeToResetPassword: PropTypes.func,
  title: PropTypes.string,
  buttonName: PropTypes.string,

};

export default SignUpForm;
