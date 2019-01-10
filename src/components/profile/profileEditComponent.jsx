import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './profile.scss';

export default class ProfileEdit extends Component {
  render() {
    const img = this.props.state;
    const { onChange, onClickChange, onSubmit, onClick } = this.props;
    return (
      <div className="container edit-form profile">
        <form>
          <div className="form-group profile-field">
            <div>{img ? <img className="rounded-circle" src={img} alt="author profile..."/> :
             <FontAwesomeIcon icon="user-circle" size={"10x"} color="#3F51B5"/>}</div>
            <label className="btn btn-outline-primary btn-file">
              Change image <input className="file-upload" name="image" onClick={onClickChange} accept=".jpg, .jpeg, .png"/>
            </label>
          </div>
          <div className="form-group profile-field">
            <input type="text" className="form-control mb-2 username" id="inlineFormInput" name="username" placeholder="Change your username here..." onChange={onChange}/>
          </div>
          <div className="form-group profile-field">
            <textarea className="form-control bio" rows="5" id="comment" name="bio" placeholder="Add something to your bio here.." onChange={onChange}></textarea>
          </div>
          <button type="submit" className="btn btn-outline-primary save" onClick={onSubmit}>Save Changes</button>
          <button type="submit" className="btn btn-outline-danger" onClick={onClick}>Cancel</button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClickChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
