﻿export const ActionType = "APP_SET_WINDOW_DIMENSIONS";

export const createAction = (width, height) => ({
  type: ActionType,
  width,
  height,
});

export const Reducer = (state, action) => {
  return {
    ...state,
    window: {
      width: action.width,
      height: action.height,
    },
  }
};

export default { ActionType, Reducer, createAction };
