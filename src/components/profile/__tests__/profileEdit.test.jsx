import React from 'react';
import { mount, shallow } from 'enzyme';
import ProfileEditComponent from '../profileEditComponent';


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

  const click = [
    { title: 'simulates submit on clicking save button', button: '.save', expected: 'submit' },
    { title: 'simulates clicking cancel button', button: '.btn-outline-danger', expected: 'submit' },
    { title: 'simulates clicking change image', button: '.file-upload', expected: 'click' },
  ];
  const fields = [
    { title: 'renders input fields', input: 'input' },
    { title: 'renders two buttons', input: 'button' },
  ];
  
  const change = [
    { title: 'handleChange should set state', button: '.save', expected: 'submit' },
    { title: 'handleChange should set image state', button: '.save', expected: 'submit' },

  ];
  const onClickChange = jest.fn();
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = mount(<ProfileEditComponent {...props} onChange={mockOnChange} onClick={mockOnClick} onSubmit={mockOnSubmit}/>);
  });

  it('renders profile edit page successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  fields.forEach(item => it(item.title, () => {
    const inputFields = wrapper.find(item.input);
    expect(inputFields).toHaveLength(2);
  }));

  it('renders textarea', () => {
    const inputFields = wrapper.find('textarea');
    expect(inputFields).toHaveLength(1);
  });

  it('renders label for file input', () => {
    const inputLabel = wrapper.find('label');
    expect(inputLabel).toBeTruthy();
  });

  click.forEach(item => it(item.title, () => {
    wrapper.find(item.button).simulate('click');
    const check = {
      submit: mockOnSubmit.mock.calls.length,
      click: mockOnClick.mock.calls.length,
    }
    expect(check[item.expected]).toEqual(1);
  }));

  it('handleChange should set state', () => {
    const event = 'bill';
    const wrapper = shallow(<ProfileEditComponent onChange={onChange} />);
    wrapper.find('#inlineFormInput').simulate('change', event);
    expect(onChange).toHaveBeenCalledWith('bill');
  });

  it('handleChange should set image state', () => {
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
