import * as types from './types';

export const errorOcurred = errMsg => ({ type: types.ERROR_OCCURRED, errMsg });
