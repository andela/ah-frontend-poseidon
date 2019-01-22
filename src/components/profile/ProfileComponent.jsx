import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './profile.scss';


export class ProfilePage extends Component {
  render() {
    const { profile: { image, username, bio }, onClick } = this.props;
    return (
      <div className="container profile">
        <div id="image">{image === null ? <FontAwesomeIcon icon="user-circle" size={"10x"} color="#3F51B5"/>: <img className="rounded-circle" src={image} alt="author profile..."/> }</div>
        <h1>{username}</h1>
        <h6>{bio}</h6>
        <button type="button" className="btn btn-outline-primary" onClick={onClick}>Edit Profile</button>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  profile: PropTypes.shape({
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
};
export default ProfilePage;
