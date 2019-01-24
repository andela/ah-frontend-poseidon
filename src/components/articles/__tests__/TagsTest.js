/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';
import Tags from '../Tags';

describe('Tags Component', () => {

  it('renders div element', () => {
    const wrapper = shallow(<Tags tags={['react', 'redux']} />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('renders tags array items', () => {
    const wrapper = shallow(<Tags tags={['react', 'redux']} />);
    expect(wrapper.contains(<span key="0" className="badge badge-info">react</span>)).toBeTruthy();
  });
});
