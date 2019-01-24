import React, { Fragment } from 'react';

const CommentCard = () => (
  <Fragment>
    <div id={props.id}>
      <div>
        <p>{props.author.username}</p>
      </div>
    </div>
  </Fragment>
);

export default CommentCard;
