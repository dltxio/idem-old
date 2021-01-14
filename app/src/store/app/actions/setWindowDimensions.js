﻿export const ActionType = "APP_SET_WINDOW_DIMENSIONS";

export const createAction = (width, height) => ({
  type: ActionType,
  dimensions: {
    width,
    height,
  },
});

export const Reducer = (state, action) => {
  return {
    ...state,
    window: {
      width: action.dimensions.width,
      height: action.dimensions.height,
    },
  }
};

export default { ActionType, Reducer, createAction };
