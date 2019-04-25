import React, { useState, useContext } from 'react'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Grid from '@material-ui/core/Grid'
import Context from '../../../../../Context/Context'
import { decisions } from './Decisions'
import {
  DecisionHeader,
  IntroText,
  DecisionIntroText,
  StyledButton,
} from './DecisionForm.style'

export const DecisionForm = () => {
  const [choices, setChoice] = useState({})
  const [state, dispatch] = useContext(Context)
  const currentDecisions = decisions.filter(
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
    if (e.target.innerText === 'START') {
      dispatch({
        type: 'resetWeights',
        toggle: true,
      })
    }
    setChoice({})
  }

  return (
    <Grid
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
              <DecisionIntroText>
                <FormLabel component="legend">{decision.introText}</FormLabel>
              </DecisionIntroText>
              {decision.options.map((option, j) => (
                <FormControlLabel
                  key={j}
                  value={option}
                  control={<Radio />}
                  label={option}
                  id={option}
                  checked={choices[decision.name] === option}
                  onClick={() => {
                    setChoice({ ...choices, [decision.name]: option })
                  }}
                />
              ))}
            </React.Fragment>
          ))}
        <Grid item>
          <StyledButton
            variant="contained"
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
        </Grid>
      </form>
    </Grid>
  )
}
