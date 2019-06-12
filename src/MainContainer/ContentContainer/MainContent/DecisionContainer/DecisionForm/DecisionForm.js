import React, { useState, useContext } from 'react'
import Context from '../../../../../Context/Context'
import { Decisions } from './Decisions'
import { Share } from '../../Share'
import {
  DecisionHeader,
  IntroText,
  StyledButton,
  StyledRadio,
  StyledFormControlLabel,
  StyledFormLabel,
  StyledGrid,
} from './DecisionForm.style'

export const DecisionForm = () => {
  const [choices, setChoice] = useState({})
  const [scenario, setScenario] = useState({ c: 0, e: 0, t: 0 })
  const [state, dispatch] = useContext(Context)
  const currentDecisions = Decisions().filter(
    decision => decision.year === state.currentDecision
  )[0]

  const handleSubmit = e => {
    e.preventDefault()
    dispatch({
      type: 'forwardToNextDecision',
    })
    /* alert(
      'choices: ' +
        JSON.stringify('C' + scenario.c + 'E' + scenario.e + 'T' + scenario.t)
    ) */
    dispatch({
      type: 'setSelectedScenario',
      name: 'C' + scenario.c + 'T' + scenario.t + 'E' + scenario.e,
    })

    // Simple choice between E1 and E0 scenarios based on emission choice in 2020
    if (state.gameState === 'over') {
      //Reset weights when clicking "try again"
      dispatch({
        type: 'resetWeights',
        toggle: true,
      })
    } else if (state.gameState === 'start') {
      //Set indicator to emission limit when the game starts
      dispatch({
        type: 'setSelectedIndicator',
        name: 'emissionLimit',
      })
    }
    setChoice({})
  }
  const getNewScenario = add => {
    let newScenario = scenario
    if (add.C || add.C === 0) newScenario.c = scenario.c + add.C
    else if (add.E || add.E === 0) newScenario.e = scenario.e + add.E
    else if (add.T || add.T === 0) newScenario.t = scenario.t + add.T
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
                    setScenario(getNewScenario(option.scenario))
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
          <Share />
        </StyledGrid>
      </form>
    </StyledGrid>
  )
}
