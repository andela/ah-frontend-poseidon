import React, { Component } from 'react';
import Home from '../components/HomeComponent';
import NavBar from '../components/dashboard/NavBarComponent';
import mockArticles from '../components/dashboard/mockData';

class HomeView extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Home articles={mockArticles} />
      </div>
    );
  }
}

export default HomeView;
