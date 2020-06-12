import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import coffeeReducer from "./reducers/coffeeReducer";
import milkReducer from "./reducers/milkReducer";
import officeReducer from "./reducers/officeReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    auth: authReducer,
    coffee: coffeeReducer,
    milk: milkReducer,
    office: officeReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);
