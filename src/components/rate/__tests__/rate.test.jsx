import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import React from 'react';
import Rating from '../index';

fontawesome.library.add(solid, regular);

global.fontawesome = fontawesome;
// // import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// const fontawesome = require('@fortawesome/react-fontawesome');
// // jest.genMockFromModule('react-fontawesome');
// const FontAwesomeIcon = (props) => {
//   return <i className="fa"/>
// }
// Object.defineProperty(fontawesome, 'FontAwesome', {value: FontAwesomeIcon, writable: true });

describe('Rate component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Rating iconType={['far', 'star']} />
      </MemoryRouter>,
    );
    expect(wrapper).toHaveLength(1);
  });
});

// export FontAwesomeIcon;
