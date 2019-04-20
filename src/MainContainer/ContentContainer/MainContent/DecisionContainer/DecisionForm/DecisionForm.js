import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { DecisionHeader, IntroText } from './DecisionForm.style'
import { decisions } from './Decisions'

export const DecisionForm = () => {
  const [choices, setChoice] = useState({})

  return (
    <Col>
      <DecisionHeader>{decisions.header}</DecisionHeader>
      <IntroText>{decisions.introText}</IntroText>
      <Form>
        {decisions.individualDecisions.map((decision, i) => (
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
            !decisions.individualDecisions.every(
              decision => choices[decision.name] !== undefined
            )
          }
        >
          Submit choices
        </Button>
      </Form>
    </Col>
  )
}
