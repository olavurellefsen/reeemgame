import React, { useReducer } from "react";
import PropTypes from "prop-types";
import Context from "./Context";
import createReducer from "./createReducer";

const ContextStore = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};

ContextStore.propTypes = {
  children: PropTypes.any
};

const initialState = {
  currentDecision: 2020
};

const reducer = createReducer(initialState, {
  reset: () => initialState,
  setCurrentDecison: (state, action) => ({
    ...state,
    currentDecision: action.number
  })
});

export default ContextStore;
