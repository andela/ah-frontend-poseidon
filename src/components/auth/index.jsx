import React from 'react';
import PropTypes from 'prop-types';

const SignUpForm = ({ onSubmit }) => (
  <div className="page-wrapper bg-blue p-t-100 p-b-100">
    <div className="wrapper wrapper--680">
      <div className="card card-1">
        <div className="header">
          <h2 align="center">Welcome to Authors Haven</h2>
        </div>
        <div className="card-body">
          <h4 className="sign-up" align="center">Sign up</h4>
          <form onSubmit={onSubmit}>
            <div className="form-label-group">
              <label htmlFor="inputUsername">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                placeholder="User name"
                pattern="[A-z0-9\s]{3,}"
                title="Username should be at-least 3 characters"
                required
                autoFocus
              />
            </div>
            <div className="form-label-group">
              <label htmlFor="inputEmail">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="email"
                title="Please submit a valid email address"
                required
                autoFocus
              />
            </div>
            <div className="form-label-group">
              <label htmlFor="inputPassword">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="password"
                pattern="(?=.*\d)(?=.*[A-Za-z]).{6,}"
                title="Password should contain at-least one digit, one alphabet and at-least six characters long"
                required
                autoFocus
              />
            </div>
            <div className="form-label-group">
              <button type="submit" name="submitButton" id="submitButton" className="btn btn-primary m-t-100" color="primary">
                <span>Sign-UP</span>
              </button>
            </div>
          </form>
          <div className="form-label-group">
            <button type="link" className="btn btn-link m-t-100" color="primary">
              <span>Already have an account? Log-in</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


export default SignUpForm;
