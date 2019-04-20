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
    <Col lg="auto">
      <IndicatorContainer />
      <EUacknowledgement />
    </Col>
    <Col>
      <GoalContainer />
      <DecisionContainer />
    </Col>
    <Col lg="6">
      <MapContainer />
      <TimelineContainer />
    </Col>
  </Row>
)
