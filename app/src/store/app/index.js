﻿import ReducerHandler from "../handler";
import setWindowDimensions from "./actions/setWindowDimensions";
import setScene from "./actions/setNavigation";
import selectClaim from "./actions/selectClaim";
import loadAsset from "./actions/loadAsset";

const initialState = {
  navigation: {
    canGoBack: false,
  },
  claims: {
    selected: null,
  },
  assets: {
    claims: null,
    vendors: null,
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
    loadAsset,
  ]
);