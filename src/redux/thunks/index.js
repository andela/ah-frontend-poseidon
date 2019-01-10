import axios from "axios";
import { errorOcurred } from "../actions/commonActions";

const axiosInstance = axios.create({
  baseURL: "https://ah-backend-poseidon-staging.herokuapp.com/api/"
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error.response.data);
  }
);

const getDataThunk = (endpoint, actionCreator) => {
  return dispatch => {
    axiosInstance
      .get(endpoint)
      .then(response => {
        dispatch(actionCreator(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(errorOcurred(err));
      });
  };
};

const postDataThunk = (endpoint, data, actionCreator, method) => {
  return dispatch => {
    const token = localStorage.getItem("userToken");
    // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiSm9obiIsImVtYWlsIjoiam9obkBkZXYuY29tIiwiZXhwIjoxNTQ3NTY3NDk0fQ.RVJi9LLtjxw1V2ubkwZidt0LEYPxRJEOXXvjibQEanc";
    axiosInstance.defaults.headers.common.Authorization = "Token ".concat(
      token
    );
    axiosInstance[method](endpoint, data)
      .then(response => {
        dispatch(actionCreator(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(errorOcurred(err));
      });
  };
};

export { getDataThunk, postDataThunk, axiosInstance};
