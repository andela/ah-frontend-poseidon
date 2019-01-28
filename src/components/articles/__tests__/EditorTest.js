/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow, mount, render } from '../../../__tests__/setup/setupEnzyme';
import Editor from '../Editor';

describe('Editor', () => {
  let editor;
  let wrapper;
  const mockCmd = jest.fn();
  const mockComponentDidMount = jest.fn();
  const props = {
    handleArticleBody: jest.fn,
    contentArea: ''
  };
  const props2 = {
    handleArticleBody: jest.fn,
    contentArea: 'test'
  };

  beforeAll(() => {
    Editor.prototype.execCmd = mockCmd;
  });
  beforeEach(() => {
    editor = shallow(<Editor {...props} />);
    shallow(<Editor {...props2} />);
    wrapper = mount(<Editor {...props} />);
  });

  it('renders correctly', () => {
    expect(editor.find('.commands')).toBeDefined();
  });

  it('should trigger createLink onClick event', () => {
    global.document = {
      execCommand: () => jest.fn(),
    };
    wrapper.find('#createLink').first().simulate('click');
  });

  it('should trigger command onClick event', () => {
    wrapper
      .find('#command')
      .first()
      .simulate('click');
  });
  it('should trigger horizontalRule onClick event', () => {
    wrapper
      .find('#horizontalRule')
      .first()
      .simulate('click');
  });

  it('Editor snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
