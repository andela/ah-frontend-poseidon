import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Dashboard.scss';

const Article = (props) => {
  const getPlainText = data => data.replace(/<(?:.|\n)*?>/gm, '');

  const {
    title, body, author, created_on, image_url, description, slug
  } = props.article;
  return (
    <div className="jumbotron col-lg-12 col-md-12 article-row">
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-6 img">
          <img src={image_url || 'http://placehold.it/350X250'} alt=" " width="350px" height="250px" />
        </div>
        <div className="col-lg-8 col-md-8 col-sm-6">
          <h3 className="title">{title}</h3>
          <hr />
          <h6>{description}</h6>
          <p className="article-body">{getPlainText(body)}</p>
          <button id='readMore' className="btn btn-primary" onClick={()=>props.getArticle(slug)}>Read more</button>
          <div className="article-details">
            <i>
              Posted by : &nbsp;
              {author.username}
              &nbsp;Posted :
              &nbsp;
              { moment(created_on).fromNow() }
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
