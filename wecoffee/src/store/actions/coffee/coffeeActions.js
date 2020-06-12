import axios from "axios";
import * as coffeeActionTypes from "./coffeeActionTypes";

export function refreshCoffeeThunk(coffee) {
  //   console.log(coffee, "coffeeActions");
  return {
    type: coffeeActionTypes.COFFEE,
    coffee: coffee,
  };
}

export function loadCoffee(token) {
  return (dispatch) => {
    return axios(`${process.env.REACT_APP_API_SERVER}/menu/get-coffee/`, {
      //   headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        dispatch(refreshCoffeeThunk(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
