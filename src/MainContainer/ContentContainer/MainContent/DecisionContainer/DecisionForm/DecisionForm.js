import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Context from '../../../../../Context/Context'
import { Decisions } from './Decisions'
import {
  DecisionHeader,
  IntroText,
  StyledButton,
  StyledRadio,
  StyledFormControlLabel,
  StyledFormLabel,
  StyledGrid,
} from './DecisionForm.style'

export const DecisionForm = ({ onStart }) => {
  const [choices, setChoice] = useState({})
  const [scenario, setScenario] = useState({ t: 0, e: 0, c: 0, b: 0 })
  const [newScenario, setNewScenario] = useState({ t: 0, e: 0, c: 0, b: 0 })
  const [state, dispatch] = useContext(Context)
  const currentDecisions = Decisions().filter(
    decision => decision.year === state.currentDecision
  )[0]

  const handleSubmit = e => {
    e.preventDefault()
    dispatch({
      type: 'forwardToNextDecision',
    })
    if (state.gameState === 'over') {
      //Reset weights when clicking "try again"
      dispatch({
        type: 'setWeights',
        weights: {},
      })
    }
    if (state.gameState === 'start') {
      if (!(state.weights.eco && state.weights.soc && state.weights.env)) {
        dispatch({
          type: 'resetWeights',
          toggle: true,
        })
      }
      onStart()
      //Set indicator to emission limit when the game starts, if no indicator has been selected
      if (!state.selectedIndicator) {
        dispatch({
          name: 'co2Intensity',
          type: 'setSelectedIndicator',
        })
      }
      setNewScenario({ t: 0, e: 0, c: 0, b: 0 })
      setScenario({ t: 0, e: 0, c: 0, b: 0 })
      dispatch({
        type: 'setSelectedScenario',
        name: 'T0E0C0B0',
      })
    } else {
      let nextScenario = {}
      nextScenario.t = newScenario.t + scenario.t
      nextScenario.e = newScenario.e + scenario.e
      nextScenario.c = newScenario.c + scenario.c
      nextScenario.b = newScenario.b + scenario.b

      setScenario(nextScenario)
      setNewScenario({ t: 0, e: 0, c: 0, b: 0 })
      dispatch({
        type: 'setSelectedScenario',
        name:
          'T' + nextScenario.t + 'E' + nextScenario.e + 'C' + nextScenario.c + 'B' + nextScenario.b,
      })
    }
    setChoice({})
  }
  const getNewScenario = add => {
    if (add.T || add.T === 0) newScenario.t = add.T
    else if (add.E || add.E === 0) newScenario.e = add.E
    else if (add.C || add.C === 0) newScenario.c = add.C
    else if (add.B || add.B === 0) newScenario.b = add.B
    else alert('add: ' + JSON.stringify(add))
    return newScenario
  }

  return (
    <StyledGrid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start"
    >
      <DecisionHeader>{currentDecisions.header}</DecisionHeader>
      <IntroText>{currentDecisions.introText}</IntroText>
      <form onSubmit={e => handleSubmit(e)}>
        {currentDecisions.individualDecisions !== undefined &&
          currentDecisions.individualDecisions.map((decision, i) => (
            <React.Fragment key={'decision' + i}>
              <StyledFormLabel component="legend">
                {decision.introText}
              </StyledFormLabel>
              {decision.options.map((option, j) => (
                <StyledFormControlLabel
                  key={'option' + j}
                  value={option.value}
                  control={<StyledRadio />}
                  label={option.text}
                  id={option.value}
                  checked={choices[decision.name] === option.value}
                  onClick={() => {
                    setChoice({
                      ...choices,
                      [decision.name]: option.value,
                    })
                    setNewScenario(getNewScenario(option.scenario))
                  }}
                />
              ))}
            </React.Fragment>
          ))}
        <StyledGrid item>
          <StyledButton
            type="submit"
            disabled={
              currentDecisions.individualDecisions !== undefined &&
              !currentDecisions.individualDecisions.every(
                decision => choices[decision.name] !== undefined
              )
            }
          >
            {currentDecisions.submitText}
          </StyledButton>
        </StyledGrid>
      </form>
    </StyledGrid>
  )
}

DecisionForm.propTypes = {
  onStart: PropTypes.func.isRequired,
}
