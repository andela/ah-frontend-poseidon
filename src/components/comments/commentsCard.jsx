import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const CommentCard = (props) => {
  const {
    body,
    commented_by,
    created_at,

  } = props;

  return (

    <Fragment>
      <div className="card bg-light mb-3">
        <div className="card-header">
      by:
          {' '}
          <i>
            {commented_by}
          </i>
        </div>
        <div className="card-body ">
          <h6>{body}</h6>
          <footer className="blockquote-footer">{moment(created_at).fromNow()}</footer>
        </div>
      </div>
    </Fragment>
  );
};
CommentCard.propTypes = {
  body: PropTypes.string,
  commented_by: PropTypes.string,
  created_at: PropTypes.func
};

export default CommentCard;
