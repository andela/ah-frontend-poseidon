import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';

class CreateArticle extends PureComponent {
  render() {
    const {
      handleCreate, handleChangeValue, handleArticleBody, contentArea,
      imageUpload,
      titleValue,
      descriptionValue,
      tagsValue,
    } = this.props;
    return (
      <div className="container mt-5 createArticle">
        <form id="articleData" className="ml-4" onSubmit={handleCreate}>
          <div>
            <input
              className="articles-text-input"
              id="title"
              type="text"
              required
              onChange={handleChangeValue('getTitle')}
              defaultValue={titleValue}
              placeholder="Title"
            />
          </div>
          <input
            className="articles-text-input"
            id="description"
            type="text"
            required
            onChange={handleChangeValue('getDescription')}
            defaultValue={descriptionValue}
            placeholder="Description"
          />
          <div className="form-row">
            <div className="col-7">
              <input
                id="tags"
                onChange={handleChangeValue('getTags')}
                type="text"
                required
                defaultValue={tagsValue}
                placeholder="Tags (,)"
              />
            </div>
            <label
              className="btn btn-outline-primary btn-file"
              htmlFor="image"
            >
          Add image
              <input
                className="file-upload"
                name="image"
                onClick={imageUpload}
                accept=".jpg, .jpeg, .png"
              />
            </label>
            <Editor
              required
              handleArticleBody={handleArticleBody}
              contentArea={contentArea}
            />
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
