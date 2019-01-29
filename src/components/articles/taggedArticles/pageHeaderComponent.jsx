import React from 'react';
import './tag-view.scss';
import PropTypes from 'prop-types';


const TagHeader = ({ tagName }) => {
  return (
    <div className="container">
      <div className="blog-header py-3">
        <h3>{ tagName }</h3>
      </div>
      <div className="py-3">
        <h4>Articles:</h4>
      </div>
    </div>
  );
};

TagHeader.propTypes = {
  tagName: PropTypes.string.isRequired,
};

export default TagHeader;
