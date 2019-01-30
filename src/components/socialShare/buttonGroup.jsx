import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBookmark } from '@fortawesome/free-solid-svg-icons';
import SocialButton from './socialMediaButton';

class ButtonGroup extends PureComponent {
  render() {
    const { shareHandler, slug, bookMark } = this.props;
    const facebookLink = `https://www.facebook.com/sharer.php?u=https://authors-havenn.herokuapp.com/articles/${slug}`;
    const twitterLink = `https://twitter.com/intent/tweet?url=http://authors-havenn.herokuapp.com/articles/${slug}&text=howtodo`;
    return (
      <div className="btn-group" role="group">
        <SocialButton
          icon="faFacebook"
          link={facebookLink}
        />
        <SocialButton
          icon="faTwitter"
          link={twitterLink}
        />
        <button id="share-email" type="button" onClick={shareHandler(slug)} className="btn btn-outline-primary">
          <FontAwesomeIcon icon={faEnvelope} />
        </button>
        <button id="bookmark" type="button" onClick={bookMark(slug)} className="btn btn-outline-primary">
          <FontAwesomeIcon icon={faBookmark} />
        </button>
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  slug: PropTypes.string.isRequired,
  shareHandler: PropTypes.func.isRequired,
  bookMark: PropTypes.func.isRequired,
};

export default ButtonGroup;
