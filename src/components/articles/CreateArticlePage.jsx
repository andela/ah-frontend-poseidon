import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';

class CreateArticle extends PureComponent {
  render() {
    const {
      handleCreate, handleChangeValue, handleArticleBody, contentArea,
    } = this.props;
    return (
      <div className="container mt-5 createArticle">
        <form id="articleData" className="ml-4" onSubmit={handleCreate}>
          <div>
            <div>
              <div>
                <input
                  className="articles-text-input"
                  id="title"
                  type="text"
                  required
                  onChange={handleChangeValue('getTitle')}
                  placeholder="Title"
                />
              </div>
              <input
                className="articles-text-input"
                id="description"
                type="text"
                required
                onChange={handleChangeValue('getDescription')}
                placeholder="Description"
              />
            </div>
            <div className="form-row">
              <div className="col-8">
                <input
                  id="tags"
                  onChange={handleChangeValue('getTags')}
                  type="text"
                  required
                  placeholder="Tags (,)"
                />
              </div>
              <Editor required handleArticleBody={handleArticleBody} contentArea={contentArea} />
            </div>
          </div>
        </form>

      </div>
    );
  }
}

CreateArticle.propTypes = {
  handleCreate: PropTypes.func,
  handleChangeValue: PropTypes.func,
  handleArticleBody: PropTypes.func,
  contentArea: PropTypes.string,
};

CreateArticle.defaultProps = {
  handleCreate: () => {},
  handleChangeValue: () => {},
  handleArticleBody: () => {},
  contentArea: '',
};

export default CreateArticle;
