import React, { Component } from 'react';
import './likeDislike.scss';

export default class ReportComponet extends Component {
  render() {
    const { displayform, onclick } = this.props;
    return (
      <div>
        <form>
          <button type="button" class="btn btn-primary" onClick={onclick}>
            Report
          </button>
        </form>

        {displayform && (
          <form>
            <label>Enter violation message here:</label>
            <br />
            <input type="text" namee="report" placeholder="Enter message" />
            <button type="button" className="btn btn-primary report-button">
              Send report
            </button>
          </form>
        )}
      </div>
    );
  }
}
