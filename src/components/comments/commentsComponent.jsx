import React from 'react';
import CommentsView from '../../views/comments/viewComments';
import NewComment from './newComment';


const Comments = (props) => {
  return (
    <div>
      <h3>Comments</h3>
      <NewComment slug={props.slug}/>
      <CommentsView slug={props.slug} />
    </div>
  );
};

export default Comments;
