import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavBar = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="/">Authors Heaven</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto my-2 my-lg-0 dropleft">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Profile
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown" data-display="static">
                <a className="dropdown-item" href="/">Notifications</a>
                <a className="dropdown-item" href="/profile">View Profile</a>
                <div className="dropdown-divider" />
                <a id="newArticle" className="dropdown-item" onClick={props.createArticle}>Create Article</a>
                <a className="dropdown-item" href="/">Your Articles</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
