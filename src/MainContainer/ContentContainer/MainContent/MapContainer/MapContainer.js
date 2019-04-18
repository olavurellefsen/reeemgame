import React from 'react'
import europe from './Map/europe.svg'
import { Container } from './MapContainer.style'

export const MapContainer = () => (
  <Container>
    <img src={europe} alt="Europe" />
  </Container>
)
