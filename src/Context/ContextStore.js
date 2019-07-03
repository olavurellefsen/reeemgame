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
  weights: {},
  scores: { eco: 300, env: 500, soc: 200 },
  weightedScores: { eco: 0, env: 0, soc: 0, sum: 0 },
  animationState: 'paused',
  animationYear: 2015,
  listOfScenarioScores: [],
  combinedScore: 0,
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
  let oldScores = JSON.parse(localStorage.getItem('score3'))
  if (!oldScores) oldScores = []
  let d = new Date()
  let score = {
    date: d.toDateString(),
    weightedScores: state.weightedScores,
    weights: state.weights,
    scenario: state.selectedScenario,
  }
  oldScores.push(score)
  localStorage.setItem('score3', JSON.stringify(oldScores))
}

const getCurrentYear = (state, newYear) => {
  return state.animationState === 'paused'
    ? parseInt(newYear)
    : state.currentYear
}

const reducer = createReducer(initialState, {
  reset: () => initialState,
  forwardToNextDecision: (state, action) => {
    let nextDecision = state.decisionCycle.indexOf(state.currentDecision) + 1
    let newGameState = state.gameCycle[state.gameCycle.indexOf(state.gameState)]
    let newScenario = state.selectedScenario
    let newWeights = state.weights
    let indicator = state.selectedIndicator
    if (nextDecision === 1) {
      //If game is starting
      newGameState = state.gameCycle[1]
    }
    if (nextDecision === state.decisionCycle.length - 1) {
      //If game is over
      newGameState = state.gameCycle[state.gameCycle.length - 1]
      saveScore(state)
      indicator = 'score'
    }
    if (nextDecision >= state.decisionCycle.length) {
      //If game is starting again
      nextDecision = 0
      newGameState = state.gameCycle[0]
      newScenario = 'C0T0E0'
      indicator = 'emissionLimit'
    }
    const newYear = state.decisionCycle[nextDecision]
    const newMaxYear = state.maxYears[nextDecision]
    return {
      ...state,
      currentDecision: newYear,
      currentYear: getCurrentYear(state, newYear),
      maxYear: newMaxYear,
      gameState: newGameState,
      selectedScenario: newScenario,
      weights: newWeights,
      selectedIndicator: indicator,
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
  setAnimationState: (state, action) => ({
    ...state,
    animationState: action.animationState,
  }),
  setAnimationYear: (state, action) => ({
    ...state,
    animationYear: Math.min(action.animationYear, state.maxYear),
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
  setWeights: (state, action) => ({
    ...state,
    weights: { eco: action.eco, env: action.env, soc: action.soc },
  }),
  setStateToShared: (state, action) => ({
    ...state,
    weights: { eco: action.eco, env: action.env, soc: action.soc },
    weightedScores: getNewWeightedScores(
      { eco: action.eco, env: action.env, soc: action.soc },
      state.scores
    ),
    currentYear: state.maxYears[state.maxYears.length - 1],
    maxYear: state.maxYears[state.maxYears.length - 1],
    gameState: state.gameCycle[state.gameCycle.length - 1],
    selectedScenario: action.scenario,
  }),
  setListOfScenarioScores: (state, action) => ({
    ...state,
    weights: { eco: action.eco, env: action.env, soc: action.soc },
  }),
  setCombinedScore: (state, action) => ({
    ...state,
    combinedScore: action.score,
  }),
})

export default ContextStore
