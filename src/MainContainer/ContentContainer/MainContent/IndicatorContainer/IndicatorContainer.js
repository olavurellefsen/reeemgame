import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Container, LeftMenuItem } from './IndicatorContainer.style'

export const IndicatorContainer = () => (
  <Container>
    <Col>
      <Row>
        <LeftMenuItem>Electricity demands</LeftMenuItem>
      </Row>
      <Row>
        <LeftMenuItem>Demand Profile</LeftMenuItem>
      </Row>
      <Row>
        <LeftMenuItem>Technology Performance</LeftMenuItem>
      </Row>
      <Row>
        <LeftMenuItem>Technology Cost</LeftMenuItem>
      </Row>
      <Row>
        <LeftMenuItem>Generation constraints</LeftMenuItem>
      </Row>
      <Row>
        <LeftMenuItem>Emission constraints</LeftMenuItem>
      </Row>
    </Col>
  </Container>
)
