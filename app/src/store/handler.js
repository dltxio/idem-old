const handlerFactory = (initialState, reducerModules) => {
  const reducers = [];
  reducerModules.forEach(module => {
    reducers[module.ActionType] = module.Reducer;
  });
  
  return (state = initialState, action) => {
    const reducer = reducers[action.type];
    if (reducer == null)
      return state;
    return reducer(state, action);
  };
};

export default handlerFactory;
