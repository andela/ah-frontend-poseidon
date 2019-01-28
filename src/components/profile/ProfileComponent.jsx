import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './profile.scss';


export class ProfilePage extends PureComponent {
  render() {
    const { profile: { image, username, bio }, onClick } = this.props;
    return (
      <div className="container profile">
        <div id="image">{image === null ? <FontAwesomeIcon icon={faUserCircle} size={"10x"} color="#3F51B5"/>: <img className="rounded-circle" src={image} alt="author profile..."/> }</div>
        <h1>{username}</h1>
        <h6>{bio}</h6>
        <button type="button" className="btn btn-outline-primary" onClick={onClick}>Edit Profile</button>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  profile: PropTypes.shape({
    image: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
};

ProfilePage.defaultProps = {
  profile: {},

};

export default ProfilePage;
