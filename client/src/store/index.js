import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import user from "./user";
import auth from "./auth";
import alert from "./alert";
import system from "./system";

const rootReducer = combineReducers({
  user,
  auth,
  alert,
  system,
});

const middlewares = [thunk];

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
});

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
