import React from 'react';
import { shallow } from 'enzyme';
import SocialButton from '../socialMediaButton';

describe('Test socialMediaButton', () => {
  const props = {
    icon: 'facebook',
    text: 'Facebook',
    link: '/facebook',
  };

  it('has only one anchor attribute', () => {
    const wrapper = shallow(<SocialButton {...props} />);
    const button = wrapper.find('a');
    expect(button).toHaveLength(1);
  });
});
