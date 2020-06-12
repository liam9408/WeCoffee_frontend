import * as officeActionsTypes from "../actions/office/officeActionTypes";

const initialState = {
  officeRootReducer: [
    {
      id: "pending",
      number: "pending",
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case officeActionsTypes.OFFICE:
      return {
        officeRootReducer: action.office,
      };
    default:
      return state;
  }
};

export default rootReducer;
