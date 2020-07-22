import { LOGIN, LOGOUT } from "../actions/auth/authActionTypes";

const initialState = {
  isLoggedIn: localStorage.getItem("token") !== null,
  token: localStorage.getItem("token") || null,
  //* need id?
  id: localStorage.getItem("id") || null,
  userType: localStorage.getItem("userType") || null,
};

function loginReducer(state, action) {
  return {
    ...state,
    isLoggedIn: true,
    token: action.token,
    //* need id?
    id: action.id,
    userType: action.userType,
  };
}

function logoutReducer(state) {
  return {
    ...state,
    isLoggedIn: false,
    token: null,
  };
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return loginReducer(state, action);
    case LOGOUT:
      return logoutReducer(state);
    default:
      return state;
  }
}
