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
  currentYear: 2019,
  maxYear: 2020,
  decisionCycle: ['2019', '2020', '2030', '2040', '2050'],
  maxYears: [2020, 2020, 2030, 2040, 2050],
  timeline: ['2015', '2020', '2025', '2030', '2035', '2040', '2045', '2050'],
  selectedIndicator: null,
  selectedScenario: 'C0T0E0',
}

const reducer = createReducer(initialState, {
  reset: () => initialState,
  forwardToNextDecision: (state, action) => {
    let nextDecision = state.decisionCycle.indexOf(state.currentDecision) + 1
    if (nextDecision >= state.decisionCycle.length) nextDecision = 0
    const newYear = state.decisionCycle[nextDecision]
    const newMaxYear = state.maxYears[nextDecision]
    return {
      ...state,
      currentDecision: newYear,
      currentYear: parseInt(newYear),
      maxYear: newMaxYear,
    }
  },
  setSelectedIndicator: (state, action) => ({
    ...state,
    selectedIndicator: action.name,
  }),
  setSelectedScenario: (state, action) => ({
    ...state,
    selectedScenario: action.name,
  }),
  setCurrentYear: (state, action) => ({
    ...state,
    currentYear: action.year,
  }),
})

export default ContextStore
