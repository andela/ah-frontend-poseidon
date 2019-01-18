import axios from "axios";
// import { errorOccurred } from '../actions/commonActions';

const axiosInstance = axios.create({
  baseURL: "https://ah-backend-poseidon-staging.herokuapp.com/api/"
});

axiosInstance.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response.data)
);
const postDataThunkNoHeader = (
  endpoint,
  data,
  actionCreatorSuccess,
  actionCreatorFailure,
  method
) => async dispatch => {
  await axiosInstance[method](endpoint, data)
    .then(response => {
      dispatch(actionCreatorSuccess(response.data));
    })
    .catch(error => {
      dispatch(actionCreatorFailure(error));
    });
};

export default postDataThunkNoHeader;
