import React from 'react'
import { Container } from './MainContainer.style'
import { Header } from './HeaderContainer/Header'
import { ContentContainer } from './ContentContainer/ContentContainer'
import { Qt } from '../utils/ScoreUtilities'

export const MainContainer = () => (
  <Container>
    <Header />
    <Qt />
    <ContentContainer />
  </Container>
)
