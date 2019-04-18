import React from 'react'
import { DecisionContainer } from './DecisionContainer/DecisionContainer'
import { GoalContainer } from './GoalContainer/GoalContainer'
import { MapContainer } from './MapContainer/MapContainer'
import { LeftContainer } from './LeftContainer/LeftContainer'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export const MainContent = () => (
  <Row>
    <Col lg="auto">
      <LeftContainer />
    </Col>
    <Col>
      <GoalContainer />
      <DecisionContainer />
    </Col>
    <Col lg="auto">
      <MapContainer />
    </Col>
  </Row>
)
