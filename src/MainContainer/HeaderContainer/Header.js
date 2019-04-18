import React from 'react'
import {
  Container,
  TitleContainer,
  LogoContainer,
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuItemLink,
  TextContainer,
} from './Header.style'
import { Link } from 'react-router-dom'
import logo from './REEEMlogo.transparent.1.svg'

export const Header = () => (
  <Container>
    <TitleContainer>
      <Link to="/">
        <LogoContainer>
          <img src={logo} alt="logo" width={200} height={40} />
        </LogoContainer>
      </Link>
      <TextContainer>Game</TextContainer>
    </TitleContainer>
    <HeaderMenu>
      <HeaderMenuItemLink to="/about">About</HeaderMenuItemLink>
      <HeaderMenuItemLink to="/score">Score</HeaderMenuItemLink>
      <HeaderMenuItem>Share</HeaderMenuItem>
    </HeaderMenu>
  </Container>
)
