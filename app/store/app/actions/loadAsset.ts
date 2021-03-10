﻿﻿﻿export const ActionType = "APP_LOAD_ASSET";

export const createAction = (assetType, assetValue) => ({
  type: ActionType,
  asset: {
    type: assetType,
    value: assetValue,
  },
});

export const Reducer = (state, { asset }) => {
  return {
    ...state,
    assets: {
      ...state.assets,
      [asset.type]: asset.value,
    },
  };
};

export default { ActionType, Reducer, createAction };
