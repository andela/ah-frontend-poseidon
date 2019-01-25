/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tags from './Tags';
import { editArticle } from '../../redux/actions/ArticleActionCreators';
import { doNothing } from '../../redux/actions/commonActions';
import ButtonGroup from '../socialShare/buttonGroup';
import LikeDislikeView from '../../views/LikeDislikeView';
import StarRatingSystem from '../../views/ratingSystemView';
import Comments from '../comments/commentsComponent';

const DateDisplay = dateString => new Date(dateString).toDateString();
class Article extends Component {
  componentDidMount() {
    const {
      article: { body },
    } = this.props;
    document.getElementById('data').innerHTML = body;
  }

  render() {
    const {
      article: {
        author: { image, username },
        title,
        created_on,
        read_time,
        slug,
        image_url,
        description,
        tags,
      },
      onClickHandler,
      shareHandler,
    } = this.props;

    return (
      <div className="container singleArticle">
        <div id="central">
          <div className="col-lg-8">
            <h1>{title}</h1>
            <div className="row">
              <div className="col-8 card-title mb-4">
                <div className="d-flex justify-content-start">
                  <div className="image-container">
                    <img className="rounded-circle" src={image || 'http://placehold.it/70x70'} id="imgProfile" />
                  </div>
                  <div className="userData ml-3">
                    <h3 className="d-block">{username}</h3>
                    <h6 className="d-block">{DateDisplay(created_on)}</h6>
                    <h6 className="d-block">{read_time}</h6>
                  </div>
                </div>
              </div>
              <div className="col" hidden={username !== localStorage.getItem('username')}>
                <button
                  type="button"
                  id="edit"
                  className="btn btn-primary space"
                  onClick={onClickHandler(slug, null, editArticle, 'put')}
                  value="Edit"
                  >
                Edit
                </button>
                <button
                  type="button"
                  id="del"
                  className="btn btn-primary"
                  onClick={onClickHandler(slug, null, doNothing, 'delete')}
                  value="Delete"
                  >
                Delete
                </button>
              </div>
            </div>
            <hr />
            {image_url ? <img src={image_url} className="img-responsive article-img" /> : ''}
            <hr />
            <p className="lead">{description}</p>
            <div id="data" className="panel" />
            <br />
            <br />
            <Tags tags={tags} />
            <br />
            <hr />
            <LikeDislikeView />
            <br />
            {
                  username !== localStorage.getItem('username')
                    ? (
                      <div className="card">
                        <div className="card-header">
                          <StarRatingSystem slug={slug} />
                        </div>
                      </div>
                    )
                    : ''
              }
            <hr />
            <ButtonGroup slug={slug} shareHandler={shareHandler} /> 
            <Comments slug={slug} />
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    created_on: PropTypes.string,
    average_rating: PropTypes.number,
    updated_on: PropTypes.string,
    image_url: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      bio: PropTypes.string,
      image: PropTypes.string,
      following: PropTypes.bool,
    }),
    favourites_count: PropTypes.number,
    tags: PropTypes.array,
    view_counts: PropTypes.number,
    read_time: PropTypes.string,
    id: PropTypes.number,
    likes: PropTypes.number,
    dislikes: PropTypes.number,
  }),
};

Article.defaultProps = {
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    created_on: '',
    average_rating: 0,
    updated_on: '',
    image_url: null,
    author: {
      username: '',
      email: '',
      bio: '',
      image: null,
      following: false,
    },
    favourites_count: 0,
    tags: [],
    view_counts: 0,
    read_time: '',
    id: 0,
    likes: 0,
    dislikes: 0,
  },
};

export default Article;
