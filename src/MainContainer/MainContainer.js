import React from 'react'
import { Container } from './MainContainer.style'
import { Header } from './HeaderContainer/Header'
import { ContentContainer } from './ContentContainer/ContentContainer'
import { Qt2, EcoScoreGen } from '../utils/ScoreUtilities'

export const MainContainer = () => (
  <Container>
    <Qt2 />
    {/* <Header /> */}
    {/* <EcoScoreGen /> */}
    {/* <ContentContainer /> */}
  </Container>
)
