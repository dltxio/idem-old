export const ActionType = "USER_AUTHENTICATE";

export const createAction = () => ({
  type: ActionType,
});

export const Reducer = (state, action) => {
  return {
    ...state,
    isAuthenticated: true,
  }
};

export default { ActionType, Reducer, createAction };
