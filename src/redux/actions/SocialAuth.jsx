// There is need to conver this function to use axios for fetching data
// eslint-disable-next-line import/prefer-default-export
const SetLocalStorage = (userData) => {
  localStorage.setItem('user', userData.user.token);
  localStorage.setItem('username', userData.user.username);
  window.location = ('/profile');
};
export const RetriveUser = response => fetch('https://ah-backend-poseidon-staging.herokuapp.com/api/user', {
  method: 'GET',
  headers: { Authorization: `Bearer ${response.access_token}` },
}).then(res => res.json())
  .then(response => SetLocalStorage(response))
  .catch();

export default (SetLocalStorage, RetriveUser);
