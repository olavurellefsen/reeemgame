import React from 'react'
import { IndicatorContainer } from './IndicatorContainer/IndicatorContainer'
import { EUacknowledgement } from './EUacknowledgement/EUacknowledgement'
import { DecisionContainer } from './DecisionContainer/DecisionContainer'
import { GoalContainer } from './GoalContainer/GoalContainer'
import { MapContainer } from './MapContainer/MapContainer'
import { TimelineContainer } from './TimelineContainer/TimelineContainer'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export const MainContent = () => (
  <Row noGutters="true">
    <Col lg="2" sm="2">
      <IndicatorContainer />
      <EUacknowledgement />
    </Col>
    <Col lg="4" sm="4">
      <GoalContainer />
      <DecisionContainer />
    </Col>
    <Col lg="6" sm="6">
      <TimelineContainer />
      <MapContainer />
    </Col>
  </Row>
)
