import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileEdit from '../../components/profile/profileEditComponent';
import { viewProfile, editProfile } from '../../redux/actions/profileActions';
import { getPrivateDataThunk, postDataThunk } from '../../redux/thunks/index';
import NavBar from '../../components/Dashboard/NavBarComponent';

export class ProfileEditView extends Component {
  state = {
    user: {
      username: '',
      bio: '',
      image: null,
    },
  }

  componentDidMount() {
    const { getPrivateDataThunk } = this.props;
    getPrivateDataThunk('profiles/'.concat(localStorage.getItem('username')), viewProfile);
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      user: {
        [name]: value,
      },
    });
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
          user: {
            image: result[0].secure_url,
          },
        });
      },
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { postDataThunk, history } = this.props;
    postDataThunk('user/', this.state, editProfile, 'put').then(() => {
      history.push('/profile');
    });
  }

  handleCancelClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/profile');
  }

  render() {
    if (this.props.profile) {
      const { profile: { profile } } = this.props;
      const { user: { image } } = this.state;
      return (
        <div>
          <NavBar />
          <ProfileEdit
            profile={profile}
            state={image}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            onClick={this.handleCancelClick}
            onClickChange={this.uploadImage}
          />
        </div>
      );
    }
    return (
      <div className="alert alert-primary" role="alert">
        <h5>Page Loading...</h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
  };
};

const actionCreators = {
  getPrivateDataThunk,
  postDataThunk,
};

ProfileEditView.propTypes = {
  getPrivateDataThunk: PropTypes.func.isRequired,
  postDataThunk: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, actionCreators)(ProfileEditView);
