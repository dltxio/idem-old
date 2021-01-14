import selectClaim from "./actions/selectClaim";

﻿import ReducerHandler from "../handler";
import setWindowDimensions from "./actions/setWindowDimensions";
import setScene from "./actions/setNavigation";

const initialState = {
  navigation: {
    canGoBack: false,
  },
  claims: {
    selected: null,
  },
  window: {
    width: 0,
    height: 0,
  },
};

export default ReducerHandler(
  initialState,
  [
    setWindowDimensions,
    setScene,
    selectClaim,
  ]
);