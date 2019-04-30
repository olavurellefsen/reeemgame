import React from 'react'
import { Link } from 'react-router-dom'
import {
  HeaderStyle,
  TitleContainer,
  HeaderMenuItemLink,
  TextContainer,
  StyledGrid,
} from './Header.style'
import logo from './REEEMlogo.transparent.1.svg'

export const Header = () => (
  <HeaderStyle>
    <StyledGrid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <StyledGrid item>
        <TitleContainer>
          <Link to="/">
            <img src={logo} alt="logo" width={200} height={40} />
          </Link>
          <TextContainer>game</TextContainer>
        </TitleContainer>
      </StyledGrid>
      <StyledGrid item>
        <StyledGrid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <HeaderMenuItemLink to="/about">About</HeaderMenuItemLink>
          <HeaderMenuItemLink to="/score">Score</HeaderMenuItemLink>
          <HeaderMenuItemLink to="/">Share</HeaderMenuItemLink>
        </StyledGrid>
      </StyledGrid>
    </StyledGrid>
  </HeaderStyle>
)
