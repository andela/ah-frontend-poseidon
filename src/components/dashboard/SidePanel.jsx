import React from 'react';
import './Dashboard.scss';

export default ({ closeNav, viewBookmark, bookmarks = [] }) => (
  <div>
    <div id="mySidepanel" className="sidepanel">
      <span className="closebtn" onClick={closeNav}>&times;</span>
      {
        bookmarks.map(({ slug, title }, i) => (
          <span key={i}>
            <a key={i} id='link' onClick={() => viewBookmark(slug)}>{title}</a>
          </span>
        ))
      }
    </div>
  </div>

);
