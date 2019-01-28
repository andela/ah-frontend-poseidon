/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import SideBar from './SideBarComponent';
import Article from './ArticleComponent';
import './Dashboard.scss';
import '../articles/articles.scss';


class Home extends React.Component {
  render() {
    const { articles, getArticle } = this.props;
    const articleList = articles || [];
    return (
      <div className="container-fluid">
        <div className="row">
          <SideBar articles={articleList} />
          <div className="col-lg-10 col-md-10 article-content">
            {articleList.map(article => (
              <Article getArticle={getArticle} article={article} key={article.id} />))}
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
};

Home.defaultProps = {
  articles: [],
};

export default Home;
