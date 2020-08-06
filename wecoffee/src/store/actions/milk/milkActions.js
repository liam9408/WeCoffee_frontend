import axios from "axios";
import * as milkActionTypes from "./milkActionTypes";
import { toast } from "react-toastify";

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
        alert("Your session has expired, please sign in again");
        localStorage.clear("token");
        console.error(err);
      });
  };
}

export function addMilk(token, milk) {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/menu/add-milk/`,
      data: { milkType: `${milk}` },
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        toast.success("Added Milk");
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function delMilk(token, milkId) {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_SERVER}/menu/del-milk/`,
      data: { milkId: milkId },
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        toast.success("Deleted Milk");
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
