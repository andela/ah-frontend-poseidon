import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './likeDislike.scss';
export class LikeDislikeComponent extends Component {
  renderThumb = (icon, customStyle, method) => {
    return (
      <div className="likeDislike">
        <FontAwesomeIcon
          icon={icon}
          color=""
          size="2x"
          style={customStyle}
          onClick={method}
        />
      </div>
    );
  };

  render() {
    const {
      article,
      likeColor,
      dislikeColor,
      onLike,
      ondislike,
      likes,
      dislikes
    } = this.props;
    return (
      <div className="row">
        <div className="col-lg-2 col-md-2">
          {likes}
          {this.renderThumb('thumbs-up', { color: likeColor }, onLike)}
        </div>
        <div className="col-lg-2 col-md-2">
          {this.renderThumb('thumbs-down', { color: dislikeColor }, ondislike)}
          {dislikes}
        </div>
      </div>
    );
  }
}

export default LikeDislikeComponent;
