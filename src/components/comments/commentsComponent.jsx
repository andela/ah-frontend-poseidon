import React from 'react';
import CommentsView from './viewComment';
import NewComment from './newComment';

const Comments = () => (
  <div>
    <h2>Comments</h2>
    <NewComment />
    <CommentsView />
  </div>
);

export default Comments;
