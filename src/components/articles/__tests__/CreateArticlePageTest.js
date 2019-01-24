/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow, mount, render } from '../../../__tests__/setup/setupEnzyme';
import CreateArticlePage from '../CreateArticlePage';
import Editor from '../Editor';

let wrapper;

describe('CreateArticlePage', () => {
  const handleCreate = jest.fn(jest.fn(), jest.fn(), jest.fn())
  const onChange = jest.fn();

  beforeAll(() => {
    Editor.prototype.componentDidMount = () => 'Test';
  });

  beforeEach(() => {
    wrapper = shallow(<CreateArticlePage
      titleValue=""
      descriptionValue=""
      tagsValue=""
      handleCreate={handleCreate}
      onContentStateChange={jest.fn()}
      handleChangeValue={onChange}
      contentArea=""
    />);
  });
  it('renders without any errors', () => {
    expect(wrapper.find('.container')).toBeDefined();
  });

  it('should call onChange event when input value changes', () => {
    const handleChangeValue = jest.fn()
    wrapper = shallow(<CreateArticlePage
      handleChangeValue={handleChangeValue}
    />);
    const value = 'number';
    wrapper.find('#title').simulate('change', { target: value });
    expect(handleChangeValue).toHaveBeenCalledWith('getTitle');
  });

  it('should invoke the handleCreate callback', () => {
    let mockFn = jest.fn();
    CreateArticlePage.prototype.handleCreate = mockFn;
    const w = wrapper.instance();
    w.handleCreate();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
