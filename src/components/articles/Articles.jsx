import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/thunks';
import {
  createArticle, getAllArticles, getOneArticle, deleteArticle, shareArticle,
} from '../../redux/actions/ArticleActionCreators';
import { CreateArticlePage, ArticlePage } from '.';
import './articles.scss';

export class ArticleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getTitle: '',
      getDescription: '',
      getTags: '',
      contentArea: '',
      viewArticle: false,
      endpointOption: 'articles/',
      createAction: createArticle,
      createMethod: 'post',
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  handleChangeValue = param => e => this.setState({ [param]: e.target.value });

  handleArticleBody = (e) => {
    const newHTML = e.target.innerText.trim();
    this.setState({ contentArea: newHTML });
  };

  handleCreate = (endpoint, actionCreator, method) => (e) => {
    e.preventDefault();
    const { getTitle, getDescription, contentArea, getTags } = this.state;
    const data = {
      article: {
        title: getTitle,
        description: getDescription,
        body: contentArea,
        tags: getTags.split(','),
      },
    };
    const { singleArticlePage, isLoading } = this.props;
    this.props.actions.postDataThunk(endpoint, data, actionCreator, method);
    isLoading(true);
    singleArticlePage(4000, true);

  };

  handleDelete = (slug, data, action, method) => e => {
    e.preventDefault()
    const { postDataThunk, deleteArticle, getDataThunk } = this.props.actions;
    const { backToHome, isLoading } = this.props;
    if (method === 'delete') {
      postDataThunk(`articles/${slug}`, data, action, method);
      isLoading(true);

      setTimeout(() => {
        getDataThunk('articles', getAllArticles);
      }, 3000);
      setTimeout(() => {
        deleteArticle(slug);
        backToHome(e);
      }, 6000);
    }
    if (method === 'put') {
      const { body, title, description, tags } = this.props.article
      this.setState(prevState => ({
        endpointOption: `articles/${slug}/`,
        createAction: action,
        createMethod: 'put',
        contentArea: body,
        getTitle: title,
        getDescription: description,
        getTags: tags.toString(),
      }));
      this.props.singleArticlePage(0, false);
    }

  }

  handleShare = slug => (e) => {
    e.preventDefault();
    const endpoint = `/${slug}/email`;
    const data = '';
    const { actions } = this.props;
    const { createMethod } = this.state;
    actions.postDataThunk(endpoint, data, shareArticle, createMethod);
  }

  render() {
    return (
      <div className='container wrapperId'>
        {this.props.viewArticle ? <ArticlePage article={this.props.article} onClickHandler={this.handleDelete} shareHandler={this.handleShare} /> :
          <CreateArticlePage
            titleValue={this.state.getTitle}
            descriptionValue={this.state.getDescription}
            tagsValue={this.state.getTags}
            handleCreate={this.handleCreate(this.state.endpointOption, this.state.createAction, this.state.createMethod)}
            handleChangeValue={this.handleChangeValue}
            handleArticleBody={this.handleArticleBody}
            contentArea={this.state.contentArea}
          />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.articles.article,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...Actions, getOneArticle, deleteArticle, shareArticle,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);
