import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SocialLogin from '../SocialLogin';

const SignUpForm = ({ onChange, formHasError, errors, onSubmit, isSignUp }) => (
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
          {errors.error && <p className="alert alert-danger">{errors.error}</p>}
          <form onSubmit={onSubmit}>
            <div className="form-label-group">
              <label htmlFor="inputUsername">Username</label>
              <input
                type="text"
                onChange={onChange}
                name="username"
                id="username"
                className="form-control"
                placeholder="Username"
                required
                autoFocus
              />
              <p className=".d-print-none">{errors.username}</p>
            </div>

            {isSignUp && (
              <div className="form-label-group">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={onChange}
                  id="email"
                  className="form-control"
                  placeholder="email"
                  required
                  autoFocus
                />
                <p className=".d-print-none">{errors.email}</p>
              </div>
            )}
            <div className="form-label-group">
              <label htmlFor="inputPassword">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={onChange}
                className="form-control"
                placeholder="password"
                required
                autoFocus
              />
              <p className=".d-print-none">{errors.password}</p>
            </div>
            <div className="form-label-group">
              <button
                type="submit"
                disabled={isSignUp && formHasError()}
                className="btn btn-primary m-t-100"
                color="primary"
              >
                <span>{isSignUp ? "Sign Up" : "Log In"}</span>
              </button>
            </div>
            <div className="form-label-group">
              <button
                type="link"
                className="btn btn-link m-t-100"
                color="primary"
              >
                <span>
                  {" "}
                  {isSignUp ? (
                    <Link to="/login"> Already have an account? Log-in</Link>
                  ) : (
                      <Link to="/signup"> Don't have an account? Register</Link>
                    )}
                </span>
              </button>
              <div className="form-label-group">
                <div hidden={isSignUp}>
                  {/* extends socialLogin component here
                while hiding it from the user registration form */}
                  <SocialLogin />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

SignUpForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape(),
  formHasError: PropTypes.func.isRequired,
  isSignUp: PropTypes.bool.isRequired
};

SignUpForm.defaultProps = {
  errors: {}
};

export default SignUpForm;
