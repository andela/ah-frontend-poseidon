import axios from 'axios';
import { errorOccurred } from '../actions/commonActions';

const axiosInstance = axios.create({
  baseURL: 'https://ah-backend-poseidon-staging.herokuapp.com/api/',
});

axiosInstance.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response.data),
);

const postDataThunkNoHeader = (
  endpoint,
  data,
  actionCreatorSuccess,
  actionCreatorFailure,
  method,
) => async (dispatch) => {
  await axiosInstance[method](endpoint, data)
    .then((response) => {
      dispatch(actionCreatorSuccess(response.data));
    })
    .catch((error) => {
      dispatch(actionCreatorFailure(error));
    });
};

const getPrivateDataThunk = (endpoint, actionCreator) => {
  return (dispatch) => {
    const token = localStorage.getItem('user');
    axiosInstance.defaults.headers.common.Authorization = 'Token '.concat(
      token,
    );
    return axiosInstance
      .get(endpoint)
      .then((response) => {
        dispatch(actionCreator(response.data));
      })
      .catch((err) => {
        dispatch(errorOccurred(err));
      });
  };
};

export default postDataThunkNoHeader;

const getDataThunk = (endpoint, actionCreator) => {
  return dispatch =>(
    axiosInstance.get(endpoint).then((response) => {
      dispatch(actionCreator(response.data));
    }).catch(err => dispatch(errorOccurred(err)))
  );
};

const postDataThunk = (endpoint, data, actionCreator, method) => (dispatch) => {
  const token = localStorage.getItem('user');
  axiosInstance.defaults.headers.common.Authorization = 'Token '.concat(token);
  return axiosInstance[method](endpoint, data).then((response) => {
    dispatch(actionCreator(response.data));
  }).catch((err) => {
    dispatch(errorOccurred(err))});
};


export { getDataThunk, postDataThunk, axiosInstance, getPrivateDataThunk };
