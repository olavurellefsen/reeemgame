import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  HeaderStyle,
  TitleContainer,
  HeaderMenuItemLink,
  TextContainer,
  StyledGrid,
} from './Header.style'
import logo from './REEEMlogo.transparent.1.svg'
import { Languages } from './LanguagesContainer/LanguagesContainer'

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
          <TextContainer>{t('header.title')}</TextContainer>
        </TitleContainer>
      </StyledGrid>
      <StyledGrid item>
        <StyledGrid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <HeaderMenuItemLink to="/about">{t('header.about')}</HeaderMenuItemLink>
          <HeaderMenuItemLink to="/score">{t('header.score')}</HeaderMenuItemLink>
          <HeaderMenuItemLink to="/">{t('header.share')}</HeaderMenuItemLink>
        </StyledGrid>
      </StyledGrid>
    </StyledGrid>
  </HeaderStyle>
)
