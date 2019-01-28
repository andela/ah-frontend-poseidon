import React from 'react';
import { mount } from 'enzyme';
import HomeComponent from '../dashboard/HomeComponent';
import mockArticles from '../dashboard/mockData';


const homeProps = {
  getArticle: jest.fn(),
  articles: mockArticles,
  nextPage: 'https://ah-backend-poseidon-staging.herokuapp.com/api/articles?page=2',
  prevPage: 'https://ah-backend-poseidon-staging.herokuapp.com/api/articles?page=2',
  currentPage: 1,
  getArticlesPage: jest.fn(),
  getTaggedArticles: jest.fn(),
  tagView: false,
  tagName: '',
};

describe('Home component', () => {
  const pageButtons = ['#nextPage', '#prevPage'];

  pageButtons.forEach(button => (
    it('getArticlesPage prop should be called on pagination button click', () => {
      const wrapper = mount(<HomeComponent {...homeProps} />);
      const spy = jest.spyOn(wrapper.instance().props, 'getArticlesPage');
      wrapper.find(button).simulate('click');
      expect(spy).toBeCalled();
    })
  ));
});
