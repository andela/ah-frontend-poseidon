import * as types from './types';

const errorOccurred = errMsg => ({ type: types.ERROR_OCCURRED, errMsg });

const doNothing = msg => ({ type: types.DO_NOTHING, msg });

export { errorOccurred, doNothing };
