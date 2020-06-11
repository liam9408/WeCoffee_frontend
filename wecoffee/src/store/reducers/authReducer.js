import { LOGIN, LOGOUT } from "../actions/auth/authActionTypes";

const initialState = {
  isLoggedIn: localStorage.getItem("token") !== null,
  token: localStorage.getItem("token") || null,
  id: localStorage.getItem("id") || null,
};

function loginReducer(state, action) {
  return {
    ...state,
    isLoggedIn: true,
    token: action.token,
    id: action.id,
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
