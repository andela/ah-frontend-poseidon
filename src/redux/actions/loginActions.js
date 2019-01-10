import { USER_LOGGED_IN } from "./types";

const loggedIn = ({ user }) => ({
  type: USER_LOGGED_IN,
  user
});

export { loggedIn };
