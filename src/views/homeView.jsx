import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Home from '../components/HomeComponent';
import NavBar from '../components/dashboard/NavBarComponent';
import Articles from '../components/articles/Articles';
import { requestArticle, getOneArticle, getAllArticles } from '../redux/actions/ArticleActionCreators'
import CircularProgressLoader from '../components/progress/index'
import { getDataThunk } from '../redux/thunks';

export class HomeView extends Component {
  state = {
    goToArticles: false,
    viewArticle: false,
    loader: {
      success: false,
      loading: false
    }
  }

  componentDidMount() {
    const { match } = this.props
    if (match.params.articleId) {
      const { articleId } = match.params
      this.props.actions.getDataThunk(`articles/${articleId}`, requestArticle)
      this.setState({ loader: { loading: true } });
      this.singleArticlePage(4000, true)
      setTimeout(() => {
        this.setState({ goToArticles: true })
        this.setState({ loader: { loading: false } });
      }, 7000);
    }
  }


  singleArticlePage = (timeout, bool) => {
    setTimeout(() => {
      this.setState({
        viewArticle: bool
      })
      this.isLoading(false)
    }, timeout);
  }

  changeToCreateArticle = bool => e => {
    e.preventDefault()
    this.setState({
      goToArticles: bool,
    })
    this.singleArticlePage(0, false)
  }

  getArticle = (slug) => {
    const { actions } = this.props;
    actions.getOneArticle(slug)
    this.singleArticlePage(0, true)
    this.setState({ goToArticles: true })
  }
  isLoading = bool => {
    this.setState({ loader: { loading: bool } })
  }

  render() {
    const { viewArticle, goToArticles, loader } = this.state;
    const { articles, nextPage, prevPage, currentPage } = this.props;
    return (
      <div>
        <CircularProgressLoader {...loader} />
        <NavBar createArticle={this.changeToCreateArticle(true)} />
        {goToArticles ?
          <Articles viewArticle={viewArticle}
            isLoading={this.isLoading}
            backToHome={this.changeToCreateArticle(false)}
            singleArticlePage={this.singleArticlePage} /> :
          <Home getArticle={this.getArticle} articles={articles}
            nextPage={nextPage}
            prevPage={prevPage} currentPage={currentPage} />}
      </div>
    );
  }
}

const mapStateToProps = ({ articles: { articles, nextPage, prevPage, currentPage } }) => ({
  articles: articles,
  nextPage: nextPage,
  prevPage: prevPage,
  currentPage: currentPage
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getOneArticle, getDataThunk }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
