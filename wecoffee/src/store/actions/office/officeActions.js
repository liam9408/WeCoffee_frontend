import axios from "axios";
import * as officeActionTypes from "./officeActionTypes";

export function refreshOfficeThunk(office) {
  return {
    type: officeActionTypes.OFFICE,
    office: office,
  };
}

export function loadOffice(token) {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/office/get-office`,
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        dispatch(refreshOfficeThunk(res.data));
      })
      .catch((err) => {
        alert("Your session has expired, please sign in again");
        localStorage.clear("token");
        console.error(err);
      });
  };
}
