import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import React from 'react';
import Rating from '../index';

fontawesome.library.add(solid, regular);

global.fontawesome = fontawesome;

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

