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
    return axios(`${process.env.REACT_APP_API_SERVER}/office/get-office/`, {
      //   headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        dispatch(refreshOfficeThunk(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
