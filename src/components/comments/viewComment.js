import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentCard from './commentsCard';
import getComments from '../../redux/actions/commentsActions/commentActions';
import { getPrivateDataThunk } from '../../redux/thunks';


class CommentsView extends Component {
componentWillUpdate(nextProps){
let comments = nextProps.comments
let previous = nextProps.previous

if(comments.results.length > previous.results.length ){
    this.props.getComments();
}
}
   
  render() {
    return (
    <CommentCard />
    );
  }
}
const actionCreators = {
  getPrivateDataThunk,
  getComments,
  };

const mapStateToProps = state => ({
  comments: state.commentReducer,
});

export default connect(
  mapStateToProps, actionCreators,
)(CommentsView);
