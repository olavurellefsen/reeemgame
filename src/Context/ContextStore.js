import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import createReducer from './createReducer'

const ContextStore = props => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  )
}

ContextStore.propTypes = {
  children: PropTypes.any,
}

const initialState = {
  currentDecision: '2019',
  decisionCycle: ['2019', '2020', '2030', '2040', '2050'],
  timeline: ['2015', '2020', '2025', '2030', '2035', '2040', '2045', '2050'],
}

const reducer = createReducer(initialState, {
  reset: () => initialState,
  forwardToNextDecision: state => {
    let nextDecision = state.decisionCycle.indexOf(state.currentDecision) + 1
    if (nextDecision >= state.decisionCycle.length) nextDecision = 0
    return {
      ...state,
      currentDecision: state.decisionCycle[nextDecision],
    }
  },
})

export default ContextStore
