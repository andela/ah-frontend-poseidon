import * as types from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case types.VIEW_PROFILE:
      return { ...state, profile: action.profile };

    case types.EDIT_PROFILE:
      return { ...state, profile: action.profile };

    default:
      return state;
  }
};
