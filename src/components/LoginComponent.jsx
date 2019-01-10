import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { loggedIn } from "../redux/actions/loginActions";
import * as Actions from "../redux/thunks";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      user: {
        username: this.getUsername.value,
        password: this.getPassword.value
      }
    };
    this.props.actions.postDataThunk("users/login/", data, loggedIn, "post");
  }
  render() {
    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-sm-12 my-auto">
            <div className="card ">
              <div className="card-body">
                <h3 className="card-title">Please Login</h3>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      ref={input => (this.getUsername = input)}
                      onChange={this.onChange}
                      placeholder="Email"
                      className="form-control"
                      type="text"
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      ref={input => (this.getPassword = input)}
                      onChange={this.onChange}
                      placeholder="Password"
                      className="form-control"
                      type="password"
                      name="password"
                    />
                  </div>

                  <button className="btn btn-secondary" type="submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
