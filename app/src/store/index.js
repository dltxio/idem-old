import { combineReducers } from "redux";
import {createStore} from "redux";
import app from "./app";
import user from "./user";

export const reducer = combineReducers({
  app,
  user,
});

export default createStore(reducer);
