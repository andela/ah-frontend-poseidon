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
            { articles.map(article => (this.renderArticle(article))) }
          </ul>
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
};

SideBar.defaultProps = {
  articles: [],
};


export default SideBar;
