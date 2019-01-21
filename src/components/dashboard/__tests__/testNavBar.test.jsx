import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../NavBarComponent';

describe('Test navbar', () => {
  it('renders NavBar Component', () => {
    const wrapper = shallow(<NavBar/>);
    expect(wrapper).toMatchSnapshot();
  });
},
);
