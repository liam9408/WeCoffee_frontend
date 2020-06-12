import * as milkActionsTypes from "../actions/milk/milkActionTypes";

const initialState = {
  milkRootReducer: [
    {
      id: "pending",
      type: "pending",
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case milkActionsTypes.MILK:
      return {
        milkRootReducer: action.milk,
      };
    default:
      return state;
  }
};

export default rootReducer;
