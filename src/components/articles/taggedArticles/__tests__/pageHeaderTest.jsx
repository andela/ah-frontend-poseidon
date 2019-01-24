import React from 'react';
import { shallow } from 'enzyme';
import TagHeader from '../pageHeaderComponent';

describe('tag header component', () => {
  const props = {
    tagName: 'tech',
  };

  it('renders with tag name', () => {
    const wrapper = shallow(<TagHeader {...props} />);
    const tagName = wrapper.find('.blog-header');
    expect(tagName).toBeTruthy();
  });
});
