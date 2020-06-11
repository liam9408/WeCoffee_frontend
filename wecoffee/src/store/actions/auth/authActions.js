import axios from "axios";
import { LOGIN, LOGOUT } from "./authActionTypes";

function loginSuccessAction(token, id) {
  return {
    type: LOGIN,
    token: token,
    id: id,
  };
}

export function logoutAction() {
  localStorage.clear("token");
  return {
    type: LOGOUT,
  };
}

export function loginThunk(email, password) {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_SERVER}/login/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.success === 1) {
          // thunk can conditionally dispatch actions
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("fName", response.data.fName);
          localStorage.setItem("lName", response.data.lName);
          dispatch(loginSuccessAction(response.data.token, response.data.id));
        } else {
          console.log("failed");
        }
      })
      .catch((err) => console.log("Error: ", err));
  };
}

export function signupThunk(firstName, lastName, email, password) {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_SERVER}/login/signup`, {
        fName: firstName,
        lName: lastName,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success === 1) {
          // thunk can conditionally dispatch action
          dispatch(loginThunk(email, password));
        } else {
          // you can dispatch other actions here if needed
          // for example, to show a error message in a modal
        }
      })
      .catch((err) => console.log("Error: ", err));
  };
}
