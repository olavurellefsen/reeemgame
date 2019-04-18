import React from 'react'
import { Container, VerticalGroup } from './MainContent.style'
import { DecisionContainer } from './DecisionContainer'
import { GoalContainer } from './GoalContainer'
import { MapContainer } from './MapContainer'
import { LeftContainer } from './LeftContainer/LeftContainer'

export const MainContent = () => (
  <Container>
    <LeftContainer />
    <VerticalGroup>
      <DecisionContainer />
      <GoalContainer />
    </VerticalGroup>
    <MapContainer />
  </Container>
)
