import profileReducer from '../profileReducer';
import {
  viewProfile,
  editProfile,
} from '../../actions/profileActions';

const initialState = {
  profile: {},
};
describe('profile_reducer', () => {
  it('should return initial state', () => {
    expect(profileReducer(undefined, {})).toEqual({});
  });

  it('should return profile', () => {
    const expected = {
      profile: { profile: {} },
    };
    expect(profileReducer(initialState, viewProfile({ profile: {} }))).toEqual(
      expected,
    );
  });

  it('should update profile', () => {
    const profile = {
      profile: {
        username: 'kabanga',
        bio: 'I love art',
      },
    };

    const expected = {
      profile: {
        username: 'bill',
        bio: 'I love tech',
      },
    };
    expect(
      profileReducer(
        profile,
        editProfile({ username: 'bill', bio: 'I love tech' }),
      ),
    ).toEqual(expected);
  });
});
