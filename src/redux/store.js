import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; // used for debugging purpose
import logger from "redux-logger"; // to display 'redux-log' in console -> effective way to see the changes in  console
import thunk from "redux-thunk"; // To make the backend API call's with redux
import { rootReducer } from "./root.reducer";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);
