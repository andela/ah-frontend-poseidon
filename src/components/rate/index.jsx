import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ iconType }) => (
  <FontAwesomeIcon className="star" icon={iconType} />
);

Rating.propTypes = {
  iconType: PropTypes.any,
  // key: PropTypes.string,
};

Rating.defaultProps = {
  iconType: [],
  // key: '',
};
export default Rating;
