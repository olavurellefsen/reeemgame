import React from 'react'
import { DecisionHeader, IntroText } from './DecisionForm.style'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const DecisionForm = () => {
  return (
    <Col>
      <DecisionHeader>Decisions in 2020</DecisionHeader>
      <IntroText>
        Which decisions do you want to make in order to reach your goal?
      </IntroText>
      <Form>
        <Form.Group controlId="researchSpending">
          <div>Spending on energy technology (R{'&'}D)?</div>
          <Form.Check type="radio" name="research" label="High" id="high" />
          <Form.Check type="radio" name="research" label="Low" id="low" />
        </Form.Group>
        <Form.Group controlId="emissionTarget">
          <div>Emission restrictions?</div>
          <Form.Check type="radio" name="emissions" label="High" id="high" />
          <Form.Check type="radio" name="emissions" label="Medium" id="med" />
          <Form.Check type="radio" name="emissions" label="Low" id="low" />
        </Form.Group>
        <Button variant="outline-success" type="submit">
          Submit decisions
        </Button>
      </Form>
    </Col>
  )
}
