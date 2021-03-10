import ReducerHandler from "../handler";
import createKey from "./actions/createKey";
import authenticate from "./actions/authenticate";

const initialState = {
  isAuthenticated: false,
};

export default ReducerHandler(
  initialState,
  [
    createKey,
    authenticate,
  ]
);