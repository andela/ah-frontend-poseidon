/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import Tags from './Tags';
import { editArticle } from '../../redux/actions/ArticleActionCreators';
import { doNothing } from '../../redux/actions/commonActions';
import ButtonGroup from '../socialShare/buttonGroup';
import LikeDislikeView from '../../views/LikeDislikeView';
import StarRatingSystem from '../../views/ratingSystemView';

fontawesome.library.add(solid, regular);

const DateDisplay = dateString => new Date(dateString).toDateString();

class Article extends Component {
  componentDidMount() {
    const {
      article: { body }
    } = this.props;
    document.getElementById('data').innerHTML = body;
  }

  render() {
    const {
      article: {
        author: { image, username },
        created_on,
        image_url,
        read_time,
        slug,
        title,
        description,
        tags
      },
      onClickHandler,
      shareHandler
    } = this.props;

    return (
      <div className="container singleArticle">
        <div className="row">
          <div className="col-lg-8">
            <h1>{title}</h1>
            <div className="row">
              <div className="col-md-1.5 img">
                <img
                  className="rounded-circle"
                  src={image || 'http://placehold.it/300x300'}
                />
                <blockquote>
                  <h6>{username}</h6>
                  <i>{DateDisplay(created_on)}</i>
                  <h6>{read_time}</h6>
                </blockquote>
              </div>

              <div
                className="col-3"
                hidden={username !== localStorage.getItem('username')}
              >
                <button
                  id="edit"
                  type="button"
                  className="btn btn-primary"
                  onClick={onClickHandler(slug, null, editArticle, 'put')}
                  value="Edit"
                >
                  Edit
                </button>
                <button
                  id="del"
                  type="button"
                  className="btn btn-primary"
                  onClick={onClickHandler(slug, null, doNothing, 'delete')}
                  value="Delete"
                >
                  Delete
                </button>
              </div>
            </div>
            <hr />
            <img
              src={image_url || 'http://placehold.it/700x300'}
              className="img-responsive article-img"
            />
            <hr />
            <p className="lead">{description}</p>
            <div id="data" className="panel" />
            <br />
            <br />

            <Tags tags={tags} />
            <hr />
            <LikeDislikeView />
            <br />
            {username !== localStorage.getItem('username') ? (
              <div className="card">
                <div className="card-header">
                  <StarRatingSystem slug={slug} />
                </div>
              </div>
            ) : (
              ''
            )}

            <div className="well">
              <h4>
                <i className="fa fa-paper-plane-o" /> Leave a Comment:
              </h4>

              <ButtonGroup slug={slug} shareHandler={shareHandler} />
              <form>
                <div className="form-group">
                  <textarea className="form-control" rows="3" />
                </div>
                <button className="btn btn-primary" type="submit">
                  Comment
                </button>
              </form>
            </div>
            <hr />
            <div>
              <h3>
                <i className="fa fa-comment">User One says:</i>
                <small> 9:41 PM on August 24, 2014</small>
              </h3>
              <p>Excellent post! Thank You the great article, it was useful!</p>

              <h3>
                <i className="fa fa-comment">User Two says:</i>
                <small> 9:47 PM on August 24, 2014</small>
              </h3>
              <p>Excellent post! Thank You the great article, it was useful!</p>
            </div>
          </div>
        </div>
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
      following: PropTypes.bool
    }),
    favourites_count: PropTypes.number,
    tags: PropTypes.array,
    view_counts: PropTypes.number,
    read_time: PropTypes.string,
    id: PropTypes.number,
    likes: PropTypes.number,
    dislikes: PropTypes.number
  })
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
      following: false
    },
    favourites_count: 0,
    tags: [],
    view_counts: 0,
    read_time: '',
    id: 0,
    likes: 0,
    dislikes: 0
  }
};

export default Article;
