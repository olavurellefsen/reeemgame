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
  gameCycle: ['start', 'run', 'over'],
  gameState: 'start',
  currentDecision: '2019',
  currentYear: 2019,
  maxYear: 2020,
  decisionCycle: ['2019', '2020', '2030', '2040', '2050'],
  maxYears: [2020, 2020, 2030, 2040, 2050],
  timeline: ['2015', '2020', '2025', '2030', '2035', '2040', '2045', '2050'],
  selectedIndicator: null,
  selectedScenario: 'C0T0E0',
  weights: { eco: 20, env: 30, soc: 50 },
  scores: { eco: 300, env: 500, soc: 200 },
  weightedScores: { eco: 60, env: 150, soc: 100, sum: 310 },
}
const getNewWeights = () => {
  var ret = {}
  var envTemp = Math.random()
  var ecoTemp = Math.random()
  var socTemp = Math.random()
  var sum = envTemp + ecoTemp + socTemp
  var env = Math.round((envTemp / sum) * 100, 2)
  var eco = Math.round((ecoTemp / sum) * 100, 2)
  var soc = 100 - env - eco
  ret = { env: env, eco: eco, soc: soc }
  return ret
}
const getNewWeightedScores = (weights, scores) => {
  var ret = {}

  var wEco = (scores.eco * weights.eco) / 100
  var wEnv = (scores.env * weights.env) / 100
  var wSoc = (scores.soc * weights.soc) / 100
  ret = { eco: wEco, env: wEnv, soc: wSoc, sum: wEco + wEnv + wSoc }
  return ret
}
const saveScore = state => {
  let oldScores = JSON.parse(localStorage.getItem('score'))
  if (!oldScores) oldScores = []
  let d = new Date()
  let score = {
    date: d.toDateString(),
    weightedScores: state.weightedScores,
  }
  oldScores.push(score)
  localStorage.setItem('score', JSON.stringify(oldScores))
}
const reducer = createReducer(initialState, {
  reset: () => initialState,
  forwardToNextDecision: (state, action) => {
    let nextDecision = state.decisionCycle.indexOf(state.currentDecision) + 1
    let newGameState = state.gameCycle[state.gameCycle.indexOf(state.gameState)]
    if (nextDecision === 1) {
      //If game is starting
      newGameState = state.gameCycle[1]
    }
    if (nextDecision === state.decisionCycle.length - 1) {
      //If game is over
      newGameState = state.gameCycle[state.gameCycle.length - 1]
      saveScore(state)
    }
    if (nextDecision >= state.decisionCycle.length) {
      //If game is starting again
      nextDecision = 0
      newGameState = state.gameCycle[0]
    }
    const newYear = state.decisionCycle[nextDecision]
    const newMaxYear = state.maxYears[nextDecision]
    return {
      ...state,
      currentDecision: newYear,
      currentYear: parseInt(newYear),
      maxYear: newMaxYear,
      gameState: newGameState,
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
  resetWeights: state => {
    var newWeights = getNewWeights()
    return {
      ...state,
      weights: newWeights,
      weightedScores: getNewWeightedScores(newWeights, state.scores),
    }
  },
  setScores: (state, action) => ({
    ...state,
    scores: { eco: action.eco, env: action.env, soc: action.soc },
    weightedScores: getNewWeightedScores(state.weights, {
      eco: action.eco,
      env: action.env,
      soc: action.soc,
    }),
  }),
})

export default ContextStore
