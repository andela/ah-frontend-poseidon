import ACTION_TYPE from '../types';

const errorOccurred = errMsg => ({ type: ACTION_TYPE.ERROR_OCCURRED, errMsg });

export default errorOccurred;
