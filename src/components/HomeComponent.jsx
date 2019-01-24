import React from 'react';
import PropTypes from 'prop-types';
import SideBar from './dashboard/SideBarComponent';
import Article from './dashboard/ArticleComponent';
import './dashboard/Dashboard.scss';
import './articles/articles.scss'

class Home extends React.Component {
  
  render(){
    const { articles, getArticle,
          nextPage, prevPage, currentPage } = this.props;
  const articleList = articles || [];
    return (
    <div className="container-fluid">
      <div className="row">
        <SideBar articles={articleList} />
        <div className="col-lg-10 col-md-10 article-content">
          {articleList.map(article => (<Article getArticle={getArticle} article={article} key={article.id} />))}
        </div>
      </div>
    </div>
  );
  }
};


Home.propTypes = {
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

export default Home;
