import axios from "axios";
import * as milkActionTypes from "./milkActionTypes";

export function refreshMilkThunk(milk) {
  return {
    type: milkActionTypes.MILK,
    milk: milk,
  };
}

export function loadMilk(token) {
  return (dispatch) => {
    return axios(`${process.env.REACT_APP_API_SERVER}/menu/get-milk/`, {
      headers: { Authorization: `${token}` },
    })
      .then((res) => {
        dispatch(refreshMilkThunk(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function addMilk(token, milk) {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/menu/add-milk/`,
      data: { milkType: milk },
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
