import React from 'react'
import {
  HeaderStyle,
  TitleContainer,
  LogoContainer,
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuItemLink,
  TextContainer,
} from './Header.style'
import { Link } from 'react-router-dom'
import logo from './REEEMlogo.transparent.1.svg'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export const Header = () => (
  <HeaderStyle>
    <Row>
      <Col>
        <TitleContainer>
          <Link to="/">
            <LogoContainer>
              <img src={logo} alt="logo" width={200} height={40} />
            </LogoContainer>
          </Link>
          <TextContainer>game</TextContainer>
        </TitleContainer>
      </Col>
      <Col lg="auto">
        <HeaderMenu>
          <HeaderMenuItemLink to="/about">About</HeaderMenuItemLink>
          <HeaderMenuItemLink to="/score">Score</HeaderMenuItemLink>
          <HeaderMenuItem>Share</HeaderMenuItem>
        </HeaderMenu>
      </Col>
    </Row>
  </HeaderStyle>
)
