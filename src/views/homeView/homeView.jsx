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
import CircularProgressLoader from '../../components/progress/index';

export class HomeView extends Component {
  state = {
    goToArticles: false,
    viewArticle: false,
    tagView: false,
    tagName: '',
    loader: {
      success: false,
      loading: false
    }
  };

  componentDidMount() {
    const { match } = this.props;
    if (match.params.articleId) {
      const { articleId } = match.params;
      this.props.actions.getDataThunk(`articles/${articleId}`, requestArticle);
      this.setState({ loader: { loading: true } });
      this.singleArticlePage(4000, true);
      setTimeout(() => {
        this.setState({ goToArticles: true });
        this.setState({ loader: { loading: false } });
      }, 7000);
    }
  }

  singleArticlePage = (timeout, bool) => {
    setTimeout(() => {
      this.setState({
        viewArticle: bool
      });
      this.isLoading(false);
    }, timeout);
  };

  changeToCreateArticle = bool => e => {
    e.preventDefault();
    this.setState({
      goToArticles: bool
    });
    this.singleArticlePage(0, false);
  };

  getArticle = slug => {
    const { actions } = this.props;
    actions.getOneArticle(slug);
    actions.getDataThunk(`articles/${slug}`, getOneArticle(slug));
    this.singleArticlePage(0, true);
    this.setState({ goToArticles: true });
  };

  isLoading = bool => {
    this.setState({ loader: { loading: bool } });
  };

  getArticlesPage = (url) => {
    const { actions: { getDataThunk } } = this.props;
    getDataThunk(url, getAllArticles);
  }

  handleClick = tag => (e) => {
    e.preventDefault();
    const {
      actions: { getDataThunk }
    } = this.props;
    getDataThunk('articles?tags='.concat(tag), getAllArticles);
    this.setState({
      tagView: true,
      tagName: tag
    });
  };

  render() {
    const {
 viewArticle, goToArticles, loader, tagView, tagName,
} = this.state;
    const {
      articles, nextPage, prevPage, currentPage, actions,
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
    };
    const articlesProps = {
      viewArticle,
      isLoading: this.isLoading,
      backToHome: this.changeToCreateArticle(false),
      singleArticlePage: this.singleArticlePage,
      ...actions,
    };
    return (
      <div>
        <CircularProgressLoader {...loader} />
        <NavBar createArticle={this.changeToCreateArticle(true)} />
        {goToArticles
          ? <Articles {...articlesProps} /> : <Home {...homeProps} />}
      </div>
    );
  }
}

const mapStateToProps = ({
  articles: {
    articles, nextPage, prevPage, currentPage,
  },
}) => ({
  articles,
  nextPage,
  prevPage,
  currentPage,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...Actions, getOneArticle, deleteArticle, shareArticle,
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
