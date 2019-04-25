import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import {
  HeaderStyle,
  TitleContainer,
  HeaderMenuItemLink,
  TextContainer,
} from './Header.style'
import logo from './REEEMlogo.transparent.1.svg'

export const Header = () => (
  <HeaderStyle>
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        <TitleContainer>
          <Link to="/">
            <img src={logo} alt="logo" width={200} height={40} />
          </Link>
          <TextContainer>game</TextContainer>
        </TitleContainer>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <HeaderMenuItemLink to="/about">About</HeaderMenuItemLink>
          <HeaderMenuItemLink to="/score">Score</HeaderMenuItemLink>
          <HeaderMenuItemLink to="/">Share</HeaderMenuItemLink>
        </Grid>
      </Grid>
    </Grid>
  </HeaderStyle>
)
