import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfilePage from '../../components/profile/ProfileComponent';
import { viewProfile } from '../../redux/actions/profileActions';
import { getPrivateDataThunk } from '../../redux/thunks/index';
import NavBar from '../../components/dashboard/NavBarComponent';

export class ProfileView extends Component {
  componentDidMount() {
    const { getPrivateDataThunk } = this.props;
    getPrivateDataThunk('profiles/'.concat(localStorage.getItem('username')), viewProfile);
  }

  handleClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/edit');
  }

  render() {
    if (this.props.profile) {
      const { profile: { profile } } = this.props;
      return (
        <div>
          <NavBar />
          <ProfilePage profile={profile} onClick={this.handleClick} />
        </div>
      );
    }
    return (
      <div className="alert alert-primary alert-message" role="alert">
        <h5>Please login to view your profile...</h5>
      </div>
    );
  }
}

ProfileView.propTypes = {
  getPrivateDataThunk: PropTypes.func.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
  };
};

export default connect(mapStateToProps, { getPrivateDataThunk })(ProfileView);
