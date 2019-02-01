import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './ShareButton.scss';

const SocialButton = (props) => {
  const { icon, link } = props;
  let iconDisplay;
  if (icon === 'faTwitter') {
    iconDisplay = faTwitter;
  } else {
    iconDisplay = faFacebook;
  }
  return (
    <a href={link} className="btn btn-outline-primary" id="social-button">
      <FontAwesomeIcon icon={iconDisplay} />
    </a>
  );
};

export default SocialButton;

SocialButton.propTypes = {
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
