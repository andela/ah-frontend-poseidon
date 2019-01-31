import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReportComponet from '../components/articles/reportComponet';

export class reportView extends Component {
  state = {
    displayform: false
  };

  onClick = () => {
    this.setState({
      displayform: true
    });
  };
  render() {
    const { displayform } = this.state;
    return (
      <div>
        <ReportComponet
          {...this.state}
          displayform={displayform}
          onclick={this.onClick}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reportView);
