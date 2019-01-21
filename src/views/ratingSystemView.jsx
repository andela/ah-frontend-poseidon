import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../redux/thunks';
import { rateArticle } from '../redux/actions/ArticleActionCreators';

class StarRatingSystem extends React.Component {
    initialState = {
      slug: '',
      score: 0,
    };

    constructor(props) {
      super(props);
      this.state = this.initialState;
    }

    onStarClick(nextValue, prevValue, name) {
      const { postDataThunk } = this.props.actions;
      const { slug } = this.props;
      const data = {
        article: {
          score: nextValue,
        },
      };
      postDataThunk(`${slug}/rate/`, data, rateArticle, 'post');
    }

    render() {
      return (
        <div align="center" className="card">
          <div className="card-header">
            <h5 className="card-title">Rate this article</h5>
          </div>
          <div className="card-body">
            <StarRatingComponent
              name="rate1"
              starCount={5}
              emptyStarColor="#D3D3D3"
              starColor="#3f51b5"
              onStarClick={this.onStarClick.bind(this)}
            />
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state, props) => ({
  score: state.score,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...Actions, rateArticle }, dispatch),
});

export { StarRatingSystem as StarRatingSystemTest };

export default connect(mapStateToProps, mapDispatchToProps)(StarRatingSystem);
