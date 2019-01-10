import React from 'react';
import ProfileEditComponent from '../../profileEditComponent';
import { mount, shallow } from 'enzyme';

describe('Test profile edit page', () => {
  let wrapper;
  let props = {
    profile: {
      username: 'kabanga',
      email: 'bill.twinomuhwezi@andela.com',
      bio: 'I love sports and tech',
      image: null,
      following: false,
    },
  };
  const mockOnChange = jest.fn();
  const mockOnClick = jest.fn();
  const mockOnSubmit = jest.fn();
  beforeEach(() => {
    wrapper = mount(<ProfileEditComponent {...props} onChange={mockOnChange} onClick={mockOnClick} onSubmit={mockOnSubmit}/>);
  });

  it('renders profile edit page successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders input fields', () => {
    const inputFields = wrapper.find('input');
    expect(inputFields).toHaveLength(2);
  });

  it('renders two buttons', () => {
    const inputFields = wrapper.find('button');
    expect(inputFields).toHaveLength(2);
  });

  it('renders textarea', () => {
    const inputFields = wrapper.find('textarea');
    expect(inputFields).toHaveLength(1);
  });

  it('renders label for file input', () => {
    const inputLabel = wrapper.find('label');
    expect(inputLabel).toBeTruthy();
  });

  it('simulates submit on clicking save button', () => {
    wrapper.find('.save').simulate('click');
    expect(mockOnSubmit.mock.calls.length).toEqual(1);
  });

  it('simulates clicking cancel button', () => {
    wrapper.find('.btn-outline-danger').simulate('click');
    expect(mockOnSubmit.mock.calls.length).toEqual(1);
  });

  it('simulates clicking change image', () => {
    wrapper.find('.file-upload').simulate('click');
    expect(mockOnClick.mock.calls.length).toEqual(1);
  });

  it('handleChange should set state', () => {
    const onChange = jest.fn();
    const event = 'bill';
    const wrapper = shallow(<ProfileEditComponent onChange={onChange} />);
    wrapper.find('#inlineFormInput').simulate('change', event);
    expect(onChange).toHaveBeenCalledWith('bill');
  });

  it('handleChange should set image state', () => {
    const onClickChange = jest.fn();
    const event = 'https://res.cloudinary.com/dos4j4vpc/image/upload/v1547647373/poseidon/cpih2ylhazsnidell5yl.jpg';
    const wrapper = shallow(<ProfileEditComponent onClickChange={onClickChange} />);
    wrapper.find('.file-upload').simulate('click', event);
    expect(onClickChange).toHaveBeenCalledWith('https://res.cloudinary.com/dos4j4vpc/image/upload/v1547647373/poseidon/cpih2ylhazsnidell5yl.jpg');
  });

  it('renders image with url', () => {
    const props = {
      state: {
        bio: 'I love sports and tech',
        image: 'https://res.cloudinary.com/dos4j4vpc/image/upload/v1547642903/poseidon/gpogzem9yqazazklk4gx.jpg',
        following: false,
      },
    };
    wrapper = shallow(<ProfileEditComponent {...props} />);
    const imageField = wrapper.find('.rounded-circle');
    expect(imageField).toBeTruthy();
  });
});
