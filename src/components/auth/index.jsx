import React from "react";
import PropTypes from "prop-types";

const SignUpForm = ({ onSubmit, isSignUp, handleLogin, renderInput }) => (
  <div className="page-wrapper bg-blue p-t-100 p-b-100">
    <div className="wrapper wrapper--680">
      <div className="card card-1">
        <div className="header">
          <h2 align="center">Welcome to Authors Haven</h2>
        </div>
        <div className="card-body">
          <h4 className="sign-up" align="center">
            {isSignUp ? "Sign Up" : "Log In"}
          </h4>
          <form onSubmit={onSubmit}>
            {renderInput(
              "inputUsername",
              "Username",
              "username",
              "text",
              "Username",
              "form-control",
              "Username",
              "Username should be at-least 3 characters",
              true,
              true,
              "[A-z0-9\\s]{3,}"
            )}
            {isSignUp &&
              renderInput(
                "inputEmail",
                "Email",
                "email",
                "email",
                "email",
                "form-control",
                "email",
                "Username should be at-least 3 characters",
                true,
                true
              )}
            {renderInput(
              "inputPassword",
              "Password",
              "password",
              "password",
              "password",
              "form-control",
              "password",
              "Password should contain at-least one digit, one alphabet and at-least six characters long",
              true,
              true,
              "(?=.*\\d)(?=.*[A-Za-z]).{6,}"
            )}
            <div className="form-label-group">
              <button
                type="submit"
                name="submitButton"
                id="submitButton"
                className="btn btn-primary m-t-100"
                color="primary"
              >
                <span>{isSignUp ? "Sign Up" : "Log In"}</span>
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
                {" "}
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
          </div>
        </div>
      </div>
    </div>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  renderInput: PropTypes.func.isRequired
};

export default SignUpForm;
