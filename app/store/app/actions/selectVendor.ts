﻿﻿﻿export const ActionType = "APP_SELECT_VENDOR";

export const createAction = (vendor) => ({
  type: ActionType,
  vendor,
});

export const Reducer = (state, action) => {
  return {
    ...state,
    vendors: {
      ...state.vendors,
      selected: action.vendor,
    },
  };
};

export default { ActionType, Reducer, createAction };
