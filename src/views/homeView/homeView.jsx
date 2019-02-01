import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/thunks';
import Home from '../../components/dashboard/HomeComponent';
import NavBar from '../../components/dashboard/NavBarComponent';
import Articles from '../../components/articles/Articles';
import {
  requestArticle, getOneArticle, getAllArticles, deleteArticle, shareArticle,
} from '../../redux/actions/ArticleActionCreators';
import { getBookmarks, getOneBookmark } from '../../redux/actions/bookmarksActions';
import CircularProgressLoader from '../../components/progress/index';

export class HomeView extends Component {
  state = {
    goToArticles: false,
    viewArticle: false,
    tagView: false,
    tagName: '',
    keyword: '',
    author: '',
    tags: '',
    loader: {
      success: false,
      loading: false,
    },
  };

  componentDidMount() {
    const { match, actions: { getDataThunk, getPrivateDataThunk } } = this.props;
    if (match.params.articleId) {
      const { articleId } = match.params;
      getDataThunk(`articles/${articleId}`, requestArticle);
      this.setState({ loader: { loading: true } });
      this.singleArticlePage(4000, true);
      setTimeout(() => {
        this.setState({ goToArticles: true });
        this.setState({ loader: { loading: false } });
      }, 7000);
    }
    getPrivateDataThunk('bookmarks/', getBookmarks);
  }

  handleSearchInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSearchClick = (e) => {
    e.preventDefault();
    const { keyword, author, tags } = this.state;
    const { actions: { getDataThunk } } = this.props;

    if (keyword) {
      getDataThunk(`articles?keyword=${keyword}`, getAllArticles);
    } else if (tags && author) {
      getDataThunk(`articles?author=${author}&tags=${tags}`, getAllArticles);
    } else if (author) {
      getDataThunk(`articles?author=${author}`, getAllArticles);
    } else if (tags) {
      getDataThunk(`articles?tags=${tags}`, getAllArticles);
    }
  }

  handleKeyPress = (event) => {
    if (event.charCode === 13) {
      return this.handleSearchClick(event);
    }
  }

  singleArticlePage = (timeout, bool) => {
    setTimeout(() => {
      this.setState({
        viewArticle: bool,
      });
      this.isLoading(false);
    }, timeout);
  };

  changeToPage = bool => (e) => {
    e.preventDefault();
    this.setState({
      goToArticles: bool,
    });
    this.singleArticlePage(0, false);
  };

  getArticle = (slug) => {
    const { actions } = this.props;
    actions.getOneArticle(slug);
    actions.getDataThunk(`articles/${slug}`, getOneArticle(slug));
    this.singleArticlePage(0, true);
    this.setState({ goToArticles: true });
  };

  isLoading = (bool) => {
    this.setState({ loader: { loading: bool } });
  };

  getArticlesPage = (url) => {
    const { actions: { getDataThunk } } = this.props;
    getDataThunk(url, getAllArticles);
  }

  handleClick = tag => (e) => {
    e.preventDefault();
    const {
      actions: { getDataThunk },
    } = this.props;
    getDataThunk('articles?tags='.concat(tag), getAllArticles);
    this.setState({
      tagView: true,
      tagName: tag,
    });
  };

  viewBookmark = (slug) => {
    const { actions } = this.props;
    actions.getOneBookmark(slug);
    this.singleArticlePage(0, true);
    this.setState({ goToArticles: true });
  }

  render() {
    const {
      viewArticle, goToArticles, loader, tagView, tagName,
    } = this.state;
    const {
      articles, bookmarks, nextPage, prevPage, currentPage, actions, error,
    } = this.props;
    const homeProps = {
      getArticle: this.getArticle,
      articles,
      nextPage,
      prevPage,
      currentPage,
      getArticlesPage: this.getArticlesPage,
      getTaggedArticles: this.handleClick,
      tagView,
      tagName,
      error,
    };
    const articlesProps = {
      viewArticle,
      isLoading: this.isLoading,
      backToHome: this.changeToPage(false),
      singleArticlePage: this.singleArticlePage,
      ...actions,
    };
    return (
      <div>
        <CircularProgressLoader {...loader} /> 
        <NavBar
          searchClick={this.handleSearchClick}
          searchInput={this.handleSearchInput}
          keyPress={this.handleKeyPress}
          changeToArticle={this.changeToPage(true)}
          viewBookmark={this.viewBookmark}
          bookmarks={bookmarks}
        />
        {goToArticles
          ? <Articles {...articlesProps} /> : <Home {...homeProps} />}
      </div>
    );
  }
}

const mapStateToProps = ({
  articles: {
    articles, nextPage, prevPage, currentPage, bookmarks,
  },
  error: { error },
}) => ({
  articles,
  bookmarks,
  nextPage,
  prevPage,
  currentPage,
  error,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...Actions, getOneArticle, deleteArticle, shareArticle, getOneBookmark,
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeView);
