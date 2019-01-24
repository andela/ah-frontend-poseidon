import React from 'react';
import { mount, shallow } from 'enzyme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ProfilePage } from '../../ProfileComponent';

describe('Test profile page', () => {
  let wrapper;
  const props = {
    profile: {
      username: 'kabanga',
      email: 'bill.twinomuhwezi@andela.com',
      bio: 'I love sports and tech',
      image: null,
      following: false,
    },
  };

  const mockOnClick = jest.fn();
  beforeEach(() => {
    wrapper = mount(<ProfilePage {...props} onClick={mockOnClick} />);
  });

  it('renders profile page successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders username', () => {
    const userName = wrapper.find('h1');
    expect(userName).toBeTruthy();
  });

  it('renders image', () => {
    const profileImage = wrapper.find('img');
    expect(profileImage).toBeTruthy();
  });

  it('renders fontawesome icon', () => {
    expect(wrapper.contains(<FontAwesomeIcon icon={faUserCircle} size={'10x'} color="#3F51B5" />)).toBeTruthy();
  });

  it('renders image with url', () => {
    const props = {
      profile: {
        username: 'kabanga',
        email: 'bill.twinomuhwezi@andela.com',
        bio: 'I love sports and tech',
        image: 'https://res.cloudinary.com/dos4j4vpc/image/upload/v1547642903/poseidon/gpogzem9yqazazklk4gx.jpg',
        following: false,
      },
    };
    wrapper = shallow(<ProfilePage {...props} onClick={mockOnClick} />);
    expect(wrapper.contains(<img className="rounded-circle" src="https://res.cloudinary.com/dos4j4vpc/image/upload/v1547642903/poseidon/gpogzem9yqazazklk4gx.jpg" alt="author profile..." />)).toBeTruthy();
  });

  it('renders with edit button', () => {
    const editButton = wrapper.find('button');
    expect(editButton).toBeTruthy();
  });

  it('simulates click event on button', () => {
    wrapper.find('button').simulate('click');
    expect(mockOnClick.mock.calls.length).toEqual(1);
  });

  it('renders author bio', () => {
    expect(wrapper.contains(<h6>{props.profile.bio}</h6>)).toBeTruthy();
  });
});
