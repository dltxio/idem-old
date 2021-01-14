﻿﻿export const ActionType = "APP_SELECT_CLAIM";

export const createAction = (claim) => ({
  type: ActionType,
  claim,
});

export const Reducer = (state, action) => {
  return {
    ...state,
    claims: {
      ...state.claims,
      selected: action.claim,
    },
  };
};

export default { ActionType, Reducer, createAction };
