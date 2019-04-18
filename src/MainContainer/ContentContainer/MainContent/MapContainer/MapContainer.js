import React from 'react'
import Row from 'react-bootstrap/Row'
import europe from './Map/europe.svg'
import { Container, Map } from './MapContainer.style'

export const MapContainer = () => (
  <Container>
    <Row noGutters="true">
      <Map src={europe} alt="Europe" />
    </Row>
  </Container>
)
