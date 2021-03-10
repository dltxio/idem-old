export const ActionType = "USER_CREATE_KEY";

export const createAction = () => ({
  type: ActionType,
});

export const Reducer = (state, action) => {
  return {
    ...state,
    createdKey: true,
  }
};

export default { ActionType, Reducer, createAction };
