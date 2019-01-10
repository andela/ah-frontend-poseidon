import React, { Component } from 'react';
import Editor from './Editor'

class CreateArticle extends Component {

  render() {
    return (
      <div className='container mt-5 createArticle'>
      <form id='articleData' className='ml-4' onSubmit={this.props.handleCreate}>
      <div>
        <div>
          <div>
            <input className='articles-text-input' id="title" type='text'
            required
          onChange={this.props.handleChangeValue('getTitle')}
          value={this.props.titleValue} placeholder='Title'/>
            </div>
          <input  className='articles-text-input' id='description' type='text' 
          required
          onChange={this.props.handleChangeValue('getDescription')}
          value={this.props.descriptionValue}
          placeholder='Description'/>
        </div>
        <div className='form-row'>
        <div className='col-8'>
          <input id='tags' onChange={this.props.handleChangeValue('getTags')} type='text'
                required
                value={this.props.tagsValue}
                placeholder='Tags (,)'/>
        </div>
        <Editor required handleArticleBody={this.props.handleArticleBody} contentArea={this.props.contentArea}/>
        </div>
      </div>
        </form></div>
    );
  }
}

export default CreateArticle;
