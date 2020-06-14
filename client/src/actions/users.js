import {
    USER_LOGGED_IN,
} from "./types";
import api from "../services";

const createUserRequest = user => ({
    type: USER_LOGGED_IN,
    user
});

export const signupRequest = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.loggedInJWT = user.token;
    dispatch(createUserRequest(user));
});