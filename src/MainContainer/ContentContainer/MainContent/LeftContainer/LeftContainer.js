import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { EUflag } from './EUflag/EUFlag'
import { Container, LeftMenuItem, EUflagContainer } from './LeftContainer.style'

export const LeftContainer = () => (
  <>
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
        <Row>
          <EUflagContainer>
            <EUflag />
          </EUflagContainer>
        </Row>
      </Col>
    </Container>
  </>
)
