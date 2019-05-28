import React, { useState, useContext } from 'react'
import Context from '../../../../../Context/Context'
import { decisions } from './Decisions'
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
  const [state, dispatch] = useContext(Context)
  const currentDecisions = decisions().filter(
    decision => decision.year === state.currentDecision
  )[0]

  const handleSubmit = e => {
    e.preventDefault()
    dispatch({
      type: 'forwardToNextDecision',
    })

    // Simple choice between E1 and E0 scenarios based on emission choice in 2020
    if (choices.emissions1 === 'high') {
      dispatch({
        type: 'setSelectedScenario',
        name: 'C0T0E1',
      })
    }
    if (state.currentDecision === '2019') {
      dispatch({
        type: 'setSelectedScenario',
        name: 'C0T0E0',
      })
    }
    if (state.gameState === 'start') {
      dispatch({
        type: 'resetWeights',
        toggle: true,
      })
    }
    setChoice({})
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
            <React.Fragment key={i}>
              <StyledFormLabel component="legend">
                {decision.introText}
              </StyledFormLabel>
              {decision.options.map((option, j) => (
                <StyledFormControlLabel
                  key={j}
                  value={option.value}
                  control={<Radio />}
                  label={option.text}
                  id={option.value}
                  checked={choices[decision.name] === option.value}
                  onClick={() => {
                    setChoice({ ...choices, [decision.name]: option.value })
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
