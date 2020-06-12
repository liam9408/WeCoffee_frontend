import * as coffeeActionsTypes from "../actions/coffee/coffeeActionTypes";

const initialState = {
  coffeeRootReducer: [
    {
      id: "pending",
      name: "pending",
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case coffeeActionsTypes.COFFEE:
      return {
        coffeeRootReducer: action.coffee,
      };
    default:
      return state;
  }
};

export default rootReducer;
