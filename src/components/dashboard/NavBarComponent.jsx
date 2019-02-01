import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PropTypes from 'prop-types';
import SidePanel from './SidePanel';

const openNav = () => {
  document.getElementById('mySidepanel').style.width = '30%';
};

const closeNav = () => {
  document.getElementById('mySidepanel').style.width = '0';
};

const NavBar = (props) => {
  const token = localStorage.getItem('user');
  const { changeToArticle, viewBookmark, bookmarks, searchClick, searchInput, keyPress, } = props;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="/">Authors Heaven</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="input-group my-lg-0 ml-auto col-lg-4">
            <input className="form-control py-2 border-right-0 border search" type="search" name="keyword" placeholder="search for article..." onChange={searchInput} onKeyPress={keyPress} />
            <span className="input-group-append">
              <button className="btn btn-outline-secondary border-left-0 border search-icon" type="button" onClick={searchClick}>
                <i className="fa fa-search" />
              </button>
            </span>
          </div>
          <div>
            <button className="btn btn-primary dropdown-toggle search-by" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Search By
            </button>
            <form className="dropdown-menu p-4 dropdown-menu-right">
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">author</span>
                </div>
                <input type="text" className="form-control author" aria-label="Small" name="author" aria-describedby="inputGroup-sizing-sm" onChange={searchInput} />
              </div>
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">tag</span>
                </div>
                <input type="text" className="form-control tags" aria-label="Small" name="tags" aria-describedby="inputGroup-sizing-sm" onChange={searchInput} />
              </div>
              <button type="button" className="btn btn-primary filter" onClick={searchClick}>Apply filters</button>
            </form>
          </div>
          <div>
            <ul className="navbar-nav ml-auto my-2 my-lg-0">
              <li className="nav-item dropdown ">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Profile
                </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown" data-display="static">
                    <a className="dropdown-item" href="/">Notifications</a>
                    <a className="dropdown-item" href="/profile">View Profile</a>
                    <div className="dropdown-divider" />
                    <a id="newArticle" className="dropdown-item" onClick={changeToArticle}>Create Article</a>
                    <a id="openPanel" className="dropdown-item" onClick={ openNav }>Bookmarks</a>
                  </div>
              </li>
            </ul>
          </div>
        <SidePanel closeNav={closeNav} viewBookmark={viewBookmark} bookmarks={bookmarks} />
        </div>
      </nav>
    </div>
  );
};


NavBar.propTypes = {
  createArticle: PropTypes.func,
  searchClick: PropTypes.func,
  searchInput: PropTypes.func,
  keyPress: PropTypes.func,
};

NavBar.defaultProps = {
  createArticle: () => {},
  searchClick: () => {},
  searchInput: () => {},
  keyPress: () => {},
};

export default NavBar;
