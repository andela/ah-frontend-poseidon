import React from 'react';
import { connect } from 'react-redux';
import { createArticle, getAllArticles, shareArticle } from '../../redux/actions/ArticleActionCreators';
import { CreateArticlePage, ArticlePage } from '.';
import './articles.scss';

export class ArticleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getTitle: '',
      getDescription: '',
      getTags: '',
      getImage: null,
      contentArea: '',
      viewArticle: false,
      endpointOption: 'articles/',
      createAction: createArticle,
      createMethod: 'post'
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  handleChangeValue = param => e => this.setState({ [param]: e.target.value });

  handleArticleBody = (e) => {
    e.target.innerText.trim();
    const newHTML = e.target.innerHTML;
    this.setState({ contentArea: newHTML });
  };

  handleCreate = (endpoint, actionCreator, method) => e => {
    e.preventDefault();
    const {
 getTitle, getDescription, contentArea, getTags, getImage,
} = this.state;
    const data = {
      article: {
        title: getTitle,
        description: getDescription,
        body: contentArea,
        tags: getTags.split(','),
        image_url: getImage,
      },
    };
    const { singleArticlePage, isLoading, postDataThunk } = this.props;
    postDataThunk(endpoint, data, actionCreator, method);
    isLoading(true);
    singleArticlePage(4000, true);
  };

  uploadImage = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: 'dos4j4vpc',
        upload_preset: 'hmpkjx6m',
        folder: 'poseidon',
        cropping: true,
        sources: ['local', 'url', 'google_photos', 'facebook', 'image_search'],
      },
      (error, result) => {
        this.setState({
          getImage: result[0].secure_url,
        });
      },
    );
  }

  handleDelete = (slug, data, action, method) => (e) => {
    e.preventDefault();
    const { postDataThunk, deleteArticle, getDataThunk } = this.props;
    const { backToHome, isLoading, singleArticlePage } = this.props;
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
      const {
        article: {
          body, title, description, tags,
        },
      } = this.props;
      this.setState(prevState => ({
        endpointOption: `articles/${slug}/`,
        createAction: action,
        createMethod: 'put',
        contentArea: body,
        getTitle: title,
        getDescription: description,
        getTags: tags.toString()
      }));
      singleArticlePage(0, false);
    }
  };

  handleShare = slug => e => {
    e.preventDefault();
    const endpoint = `/${slug}/email`;
    const data = '';
    const { postDataThunk } = this.props;
    const { createMethod } = this.state;
    postDataThunk(endpoint, data, shareArticle, createMethod);
  }

  render() {
    const { viewArticle, article } = this.props;
    const {
      getTitle, getDescription, getTags, endpointOption, createAction, createMethod, contentArea,
    } = this.state;
    const createArticleProps = {
      titleValue: getTitle,
      descriptionValue: getDescription,
      tagsValue: getTags,
      handleCreate: this.handleCreate(endpointOption, createAction, createMethod),
      handleChangeValue: this.handleChangeValue,
      handleArticleBody: this.handleArticleBody,
      imageUpload: this.uploadImage,
      contentArea,
    };
    return (
      <div className="container wrapperId">
        {viewArticle ? <ArticlePage article={article} onClickHandler={this.handleDelete} shareHandler={this.handleShare} />
          : <CreateArticlePage {...createArticleProps} />}
      </div>
    );
  }
}

const mapStateToProps = ({ articles: { article } }) => ({
  article,
});

export default connect(mapStateToProps)(ArticleView);
