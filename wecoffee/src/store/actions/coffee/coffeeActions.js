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

export function addOrder(
  coffeeId,
  coffeeName,
  milkId,
  milkName,
  name,
  officeId
) {
  return (dispatch) => {
    console.log(coffeeId, coffeeName, milkId, milkName, name, officeId);
    return axios
      .post(`${process.env.REACT_APP_API_SERVER}/orders/add-order`, {
        coffeeId: coffeeId,
        coffeeName: coffeeName,
        milkId: milkId,
        milkName: milkName,
        name: name,
        officeId: officeId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
