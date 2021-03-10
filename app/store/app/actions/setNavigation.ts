﻿﻿export const ActionType = "APP_SET_LAST_SCENE";

export const createAction = ({ canGoBack }) => ({
  type: ActionType,
  canGoBack,
});

export const Reducer = (state, action) => {
  return {
    ...state,
    navigation: {
      ...state.navigation,
      canGoBack: action.canGoBack,
    },
  }
};

export default { ActionType, Reducer, createAction };
