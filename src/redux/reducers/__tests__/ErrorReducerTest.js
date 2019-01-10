import reducer from '../ErrorReducer';
import { errorOccurred } from '../../actions/commonActions';

describe('error reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it('should handle ERROR_OCCURED', () => {
    expect(
      reducer({}, errorOccurred('error')),
    ).toEqual({ error: 'error' });
  });
});
