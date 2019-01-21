import React from 'react';
import Rating from '../components/rate';

class StarRating extends React.Component {
    initialState = {
      minRating: 0,
      maxRating: 5,
      rating: 0,
      starRatio: 1,
    };


    constructor(props) {
      super(props);
      const { rating } = props;
      this.initialState.rating = rating;
      this.state = this.initialState;
    }

    fullStars = () => {
      const { rating, starRatio } = this.state;
      return Math.floor(rating / starRatio);
    };

    maxStars = () => {
      const { maxRating, starRatio } = this.state;
      return Math.ceil(maxRating / starRatio);
    };

    halfStars = () => {
      const { rating, starRatio } = this.state;
      const x = rating % starRatio;
      const i = (1 / 2) * starRatio;
      return x >= i ? 1 : 0;
    };

    emptyStars() {
      return this.maxStars() - this.fullStars() - this.halfStars();
    }

    render() {
      const fullStars = this.fullStars();
      const halfStars = this.halfStars();
      const emptyStars = this.emptyStars();

      const renderFullStars = () => (Number.isInteger(fullStars) && fullStars > 0
        ? Array(fullStars)
          .fill(null)
          .map((item, i) => <Rating key={`fs${i}`} iconType="star" />)
        : '');

      const renderHalfStars = () => (Number.isInteger(halfStars) && halfStars > 0
        ? Array(halfStars)
          .fill(null)
          .map((item, i) => (
            <span key={`hs${i}`} className="fa-layers fa-fw star">
              <Rating iconType="star-half" />
              <Rating iconType={['far', 'star-half']} />
            </span>
          ))
        : ''
      );

      const renderEmptyStars = () => (Number.isInteger(emptyStars) && emptyStars > 0
        ? Array(emptyStars)
          .fill(null)
          .map((item, i) => (
            <Rating key={`es${i}`} iconType={['far', 'star']} />
          ))
        : '');


      return (
        <div data-toggle="popover" data-container="body" className="star-rating">
          <label>Rating :</label>
          {renderFullStars()}
          {renderHalfStars()}
          {renderEmptyStars()}
        </div>
      );
    }
}
export default StarRating;
