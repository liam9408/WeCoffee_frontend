import axios from "axios";
import * as milkActionTypes from "./milkActionTypes";

export function refreshMilkThunk(milk) {
  //   console.log(milk, "MilkActions");
  return {
    type: milkActionTypes.MILK,
    milk: milk,
  };
}

export function loadMilk(token) {
  return (dispatch) => {
    return axios(`${process.env.REACT_APP_API_SERVER}/menu/get-milk/`, {
      //   headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        dispatch(refreshMilkThunk(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
