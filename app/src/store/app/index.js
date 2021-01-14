﻿import ReducerHandler from "../handler";
import setWindowDimensions from "./actions/setWindowDimensions";

const initialState = {
  window: {
    width: 0,
    height: 0,
  },
};

export default ReducerHandler(
  initialState,
  [
    setWindowDimensions,
  ]
);