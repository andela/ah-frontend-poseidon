import React, { Fragment } from 'react';

class NewComment extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
    }

    render() {
      return (
        <Fragment>
          <form>
            <textarea placeholder="add comment here...." type="text" />
            <br />
            <button type="submit">
          comment
            </button>
          </form>
        </Fragment>
      );
    }
}
export default NewComment;
