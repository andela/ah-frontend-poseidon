/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.scss';

library.add(faTags);

class SideBar extends Component {
  renderArticle = (article) => {
    const { title, id } = article;
    return (
      <li className="nav-item" key={id}>
        <a className="nav-link" href="/">
          {title}
        </a>
      </li>);
  };

  renderTags = (article) => {
    const { tags = [], id } = article;
    const { getTaggedArticles } = this.props;
    return (
      <div className="nav-item" key={id}>
        <div className="tag-item">
          {tags.map((tag, i) => <a key={i}><span key={i} className="badge badge-info" id="tag-name" onClick={getTaggedArticles(tag)}>{tag}</span></a>)}
        </div>
      </div>
    );
  }

  render() {
    const { articles } = this.props;
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <h6>Article Titles</h6>
          <hr />
          <ul className="nav flex-column">
            { articles.map(article => (this.renderArticle(article))) }
          </ul>
          <hr />
          <div>
            <FontAwesomeIcon icon="tags" />
            {' '}
Tags:
            {articles.map(article => (this.renderTags(article)))}
          </div>
        </div>
      </nav>
    );
  }
}


SideBar.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      body: PropTypes.string,
      tags: PropTypes.array,
      created_on: PropTypes.string,
      updated_on: PropTypes.string,
      favorited: PropTypes.boolean,
      favourites_count: PropTypes.number,
      author: PropTypes.object,
      id: PropTypes.number,
    }),
  ),
  getTaggedArticles: PropTypes.func.isRequired,
};

SideBar.defaultProps = {
  articles: [],
};


export default SideBar;
