import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import CircularProgressLoader from '..';

describe('progress loader component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <MemoryRouter>
        <CircularProgressLoader loading />
      </MemoryRouter>,
    );
    expect(wrapper).toHaveLength(1);
  });
});
