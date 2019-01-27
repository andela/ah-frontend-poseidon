import React, { Component } from 'react';

import { connect } from 'react-redux';
import LikeDislikeComponent from '../components/articles/LikeDislikeComponent';
import { postDataThunk } from '.././redux/thunks';
import { likeArticle, dislikeArticle } from '../redux/actions/optionActions';

export class LikeDislikeView extends Component {
  state = {
    loading: true,
    likeColor: JSON.parse(localStorage.getItem('likeColor')) || [],
    dislikeColor: JSON.parse(localStorage.getItem('dislikeColor')) || [],
    like: '',
    dislikes: ''
  };

  componentDidMount() {
    const {
      article: { likes, dislikes }
    } = this.props;
    this.setState({ likes, dislikes });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.likeStatus) {
      const { likes, dislikes } = nextProps.likeStatus;
      this.setState({ likes, dislikes });
    }
  }

  //Method to handlelike
  onLike = () => {
    const { article, postDataThunk } = this.props;
    const { likeColor, dislikeColor } = this.state;
    if (article.likes > 1) {
      this.setState(
        {
          likeColor: '#808080'
        },
        () => {
          localStorage.setItem('likeColor', JSON.stringify(likeColor));
        }
      );
    } else {
      this.setState(
        {
          likeColor: '#3f51b5',
          dislikeColor: '#808080'
        },
        () => {
          localStorage.setItem('dislikeColor', JSON.stringify(dislikeColor));
          localStorage.setItem('likeColor', JSON.stringify(likeColor));
        }
      );
    }
    postDataThunk(`articles/${article.id}/like/`, {}, likeArticle, 'post');
  };

  //Method to handle disliking
  ondislike = () => {
    const { article, postDataThunk } = this.props;
    const { likeColor, dislikeColor } = this.state;
    if (article.dislikes > 1) {
      this.setState(
        {
          dislikeColor: '#808080'
        },
        () => {
          localStorage.setItem('dislikeColor', JSON.stringify(dislikeColor));
        }
      );
    } else {
      this.setState(
        {
          likeColor: '#808080',
          dislikeColor: '#3f51b5'
        },
        () => {
          localStorage.setItem('dislikeColor', JSON.stringify(dislikeColor));
          localStorage.setItem('likeColor', JSON.stringify(likeColor));
        }
      );
    }
    postDataThunk(
      `articles/${article.id}/dislike/`,
      {},
      dislikeArticle,
      'post'
    );
  };

  render() {
    const { article } = this.props;
    const { likes, dislikes } = this.state;

    return (
      <div>
        <LikeDislikeComponent
          onLike={this.onLike}
          ondislike={this.ondislike}
          likes={likes}
          dislikes={dislikes}
          {...this.state}
          loading={this.loading}
          article={article}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    article: state.articles.article,
    likeStatus: state.optionsReducer
  };
};

const actionCreators = {
  postDataThunk
};

export default connect(
  mapStateToProps,
  actionCreators
)(LikeDislikeView);
