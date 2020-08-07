import axios from "axios";
import * as coffeeActionTypes from "./coffeeActionTypes";
import { toast } from "react-toastify";

export function refreshCoffeeThunk(coffee) {
  return {
    type: coffeeActionTypes.COFFEE,
    coffee: coffee,
  };
}

export function loadCoffee(token) {
  return (dispatch) => {
    return axios(`${process.env.REACT_APP_API_SERVER}/menu/get-coffee/`, {
      headers: { Authorization: `${token}` },
    })
      .then((res) => {
        dispatch(refreshCoffeeThunk(res.data));
      })
      .catch((err) => {
        alert("Your session has expired, please sign in again");
        localStorage.clear("token");
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
  officeId,
  cupId
) {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_SERVER}/orders/add-order`, {
        coffeeId: coffeeId,
        coffeeName: coffeeName,
        milkId: milkId,
        milkName: milkName,
        name: name,
        officeId: officeId,
        cupId: cupId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function addCoffee(token, coffee) {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/menu/add-coffee/`,
      data: { coffeeName: `${coffee}` },
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        toast.success("Added Coffee");
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function delCoffee(token, coffeeId) {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_SERVER}/menu/del-coffee/`,
      data: { coffeeId: coffeeId },
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        toast.success("Deleted Coffee");
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
