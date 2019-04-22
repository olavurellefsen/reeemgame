import React, { useState, useContext } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Context from '../../../../../Context/Context'
import { decisions } from './Decisions'
import { DecisionHeader, IntroText } from './DecisionForm.style'

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

    setChoice({})
    e.target.reset()
  }

  return (
    <Col>
      <DecisionHeader>{currentDecisions.header}</DecisionHeader>
      <IntroText>{currentDecisions.introText}</IntroText>
      <Form onSubmit={e => handleSubmit(e)}>
        {currentDecisions.individualDecisions !== undefined &&
          currentDecisions.individualDecisions.map((decision, i) => (
            <Form.Group key={i} controlId={decision.name}>
              <div>{decision.introText}</div>
              {decision.options.map((option, j) => (
                <Form.Check
                  key={j}
                  type="radio"
                  name={decision.name}
                  label={option}
                  id={option}
                  onClick={() => {
                    setChoice({ ...choices, [decision.name]: option })
                  }}
                />
              ))}
            </Form.Group>
          ))}
        <Button
          variant="success"
          type="submit"
          disabled={
            currentDecisions.individualDecisions !== undefined &&
            !currentDecisions.individualDecisions.every(
              decision => choices[decision.name] !== undefined
            )
          }
        >
          {currentDecisions.submitText}
        </Button>
      </Form>
    </Col>
  )
}
