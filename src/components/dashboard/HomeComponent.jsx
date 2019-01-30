/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import SideBar from './SideBarComponent';
import Article from './ArticleComponent';
import './Dashboard.scss';
import '../articles/articles.scss';
import TagHeader from '../articles/taggedArticles/pageHeaderComponent';


class Home extends React.Component {
  render() {
    const {
      articles, getArticle, getTaggedArticles, tagView, tagName, getArticlesPage, nextPage,
      prevPage, currentPage,
    } = this.props;
    const articleList = articles || [];
    return (
      <div className="container-fluid">
        <div className="row">
          {tagView ? <TagHeader tagName={tagName} />
            : <SideBar articles={articleList} getTaggedArticles={getTaggedArticles} />}
          <div className="col-lg-10 col-md-10 article-content">
            {
              articleList.map(article => (
                <Article
                  getArticle={getArticle}
                  article={article}
                  key={article.id}
                />))}
            <div className="btn-group align-middle">
              <button
                type="button"
                disabled={!prevPage}
                id="prevPage"
                className="btn btn-outline-primary"
                onClick={() => getArticlesPage(prevPage)}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-outline-primary rounded-circle"
              >
                {currentPage}
              </button>
              <button
                type="button"
                disabled={!nextPage}
                id="nextPage"
                className="btn btn-outline-primary"
                onClick={() => getArticlesPage(nextPage)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Home.propTypes = {
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
  getArticle: PropTypes.func.isRequired,
  getArticlesPage: PropTypes.func.isRequired,
  getTaggedArticles: PropTypes.func.isRequired,
  tagView: PropTypes.bool.isRequired,
  tagName: PropTypes.string.isRequired,
  nextPage: PropTypes.string,
  prevPage: PropTypes.string,
  currentPage: PropTypes.number,
};

Home.defaultProps = {
  articles: [],
};

export default Home;
