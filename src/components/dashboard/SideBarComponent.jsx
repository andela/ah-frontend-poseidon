/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';

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

  render() {
    const { articles } = this.props;
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            {articles.map(article => (this.renderArticle(article)))}
          </ul>
        </div>
      </nav>
    );
  }
}


SideBar.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      tags: PropTypes.array.isRequired,
      created_on: PropTypes.string.isRequired,
      updated_on: PropTypes.string.isRequired,
      favorited: PropTypes.boolean,
      favourites_count: PropTypes.number.isRequired,
      author: PropTypes.object.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};


export default SideBar