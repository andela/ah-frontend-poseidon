import * as types from './types';

const viewProfile = profile => ({ type: types.VIEW_PROFILE, profile });
const editProfile = profile => ({ type: types.EDIT_PROFILE, profile });

export { viewProfile, editProfile };
