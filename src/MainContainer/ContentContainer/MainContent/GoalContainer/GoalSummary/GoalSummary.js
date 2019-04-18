import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { GoalHeader, IntroText } from './GoalSummary.style'

export const GoalSummary = () => {
  return (
    <Col>
      <GoalHeader>Goal</GoalHeader>
      <IntroText>
        Your goal is to maximise the score in 2050. Your score is calculated as
        the weighted average of the economic, social, and enviromental scores,
        which can be seen below.
      </IntroText>
      <Container>
        <Row>
          <Col />
          <Col>Weight</Col>
          <Col>Score</Col>
        </Row>
        <Row>
          <Col>Economic</Col>
          <Col>21%</Col>
          <Col>OOOOOOOOOOOO</Col>
        </Row>
        <Row>
          <Col>Social</Col>
          <Col>38%</Col>
          <Col>OOOOO</Col>
        </Row>
        <Row>
          <Col>Envionmental</Col>
          <Col>41%</Col>
          <Col>OOOOOOOO</Col>
        </Row>
      </Container>
    </Col>
  )
}
