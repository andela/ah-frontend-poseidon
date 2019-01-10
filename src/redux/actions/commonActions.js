import * as types from './types';

const errorOcurred = errMsg => ({ type: types.ERROR_OCCURRED, errMsg });

const doNothing = msg => ({ type: types.DO_NOTHING, msg });

export { errorOcurred, doNothing };
