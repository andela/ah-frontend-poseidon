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
      articles, getArticle, getTaggedArticles, tagView, tagName,
    } = this.props;
    const articleList = articles || [];
    if (tagView) {
      return (
        <div className="container-fluid">
          <div className="row">
            <TagHeader tagName={tagName}/>
            <div className="col-lg-10 col-md-10 article-content">
              {articleList.map(article => (<Article getArticle={getArticle} article={article} key={article.id} />))}
            </div>
          </div>
        </div>
      );
    } return (
      <div className="container-fluid">
        <div className="row">
          <SideBar articles={articleList} getTaggedArticles={getTaggedArticles}/>
          <div className="col-lg-10 col-md-10 article-content">
            {articleList.map(article => (<Article getArticle={getArticle} article={article} key={article.id} />))}
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
  getTaggedArticles: PropTypes.func.isRequired,
  tagView: PropTypes.bool.isRequired,
  tagName: PropTypes.string.isRequired,
};

Home.defaultProps = {
  articles: [],
};

export default Home;
