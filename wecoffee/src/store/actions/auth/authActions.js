import axios from "axios";
import { LOGIN, LOGOUT } from "./authActionTypes";

function loginSuccessAction(token, userType) {
  return {
    type: LOGIN,
    token: token,
    userType: userType,
  };
}

export function logoutAction() {
  localStorage.clear("token");
  return {
    type: LOGOUT,
  };
}

export function loginThunk(username, password) {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_SERVER}/login/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.success === 1) {
          // thunk can conditionally dispatch actions
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userType", response.data.userType);
          dispatch(
            loginSuccessAction(response.data.token, response.data.userType)
          );
        } else {
          console.log("failed");
        }
      })
      .catch((err) => console.log("Error: ", err));
  };
}

export function signupThunk(username, userType, password) {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_SERVER}/login/signup`, {
        username: username,
        userType: userType,
        password: password,
      })
      .then((response) => {
        if (response.data.success === 1) {
          // thunk can conditionally dispatch action
          dispatch(loginThunk(username, password));
        }
      })
      .catch((err) => console.log("Error: ", err));
  };
}
