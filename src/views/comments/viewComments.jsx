/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentCard from '../../components/comments/commentsCard';
import { getComments } from '../../redux/actions/commentActions';
import { getPrivateDataThunk } from '../../redux/thunks';


class CommentsView extends Component {
  componentDidMount() {
    const {
      getPrivateDataThunk,
      getComments,
      slug,
    } = this.props;
    getPrivateDataThunk(`${slug}/comments`, getComments);
  }

  render() {
    const {
      comments: { comments },
    } = this.props;
   
    return (
      <div className="comments-container">
        {comments.map((post, index) => <CommentCard {...post} key={index} />)}
      </div>
    );
  }
}
const actionCreators = {
  getPrivateDataThunk,
  getComments,
};

const mapStateToProps = state => ({
  comments: state.comments,
});

export default connect(
  mapStateToProps, actionCreators,
)(CommentsView);
