import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { postComment, getComments } from '../../redux/actions/commentActions';
import { postDataThunk, getDataThunk } from '../../redux/thunks/index';
import './comments.scss';


export class NewComment extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      const {
        postComment,
        getComments,
        postDataThunk,
        getDataThunk,
        slug
      } = this.props;

      const body = e.target.comment.value;
      postDataThunk(`${slug}/comments/`, { comment: { body } }, postComment, 'post');
      setTimeout(() => {
        getDataThunk(`${slug}/comments/`, getComments);
      }, 1000);
      e.target.comment.value = '';
    }

    render() {
      return (
        <Fragment>
          <div className="form-group">
            <form onSubmit={this.handleSubmit}>
              <textarea className="form-control" placeholder="add comment here...." type="text" name="comment" />
              <br />
              <button type="submit" className="btn btn-primary">
         comment
              </button>
            </form>
          </div>
        </Fragment>
      );
    }
}
// NewComment.defaultProps = {
//   postComment: PropTypes.func,
//   postDataThunk: PropTypes.func,
// };


const actionCreators = {
  postDataThunk,
  postComment,
  getComments,
  getDataThunk,

};

const mapStateToProps = state => ({
  comment: state.comment,
  // slug: state.articles.articles,
});

export default connect(
  mapStateToProps, actionCreators,
)(NewComment);
