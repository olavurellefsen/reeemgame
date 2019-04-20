import React from 'react'
import { ReactComponent as Europe } from './Map/europe.svg'
import { Container, StyledEurope } from './MapContainer.style'

export const MapContainer = () => (
  <Container>
    <StyledEurope>
      <Europe />
    </StyledEurope>
  </Container>
)
