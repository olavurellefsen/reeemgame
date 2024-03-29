import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  HeaderStyle,
  TitleContainer,
  HeaderMenuItemLink,
  TextContainer,
  StyledGrid,
  Divider,
} from './Header.style'
import logo from './PDGlogo.transparent.1-optimized.svg'
import { Languages } from './LanguagesContainer/LanguagesContainer'

export const Header = () => {
  const { t } = useTranslation()
  return (
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
            <div
              style={{
                fontFamily: 'Montserrat',
                fontWeight: '700',
                fontSize: '18px',
                color: 'red',
                padding: '10px 40px 0px 40px',
              }}
            >
              
            </div>
          </TitleContainer>
        </StyledGrid>
        <StyledGrid item>
          <StyledGrid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Divider />
            <Languages />
            <Divider />
            <HeaderMenuItemLink to="/about">
              {t('header.about')}
            </HeaderMenuItemLink>
            <HeaderMenuItemLink to="/score">
              {t('header.score')}
            </HeaderMenuItemLink>
          </StyledGrid>
        </StyledGrid>
      </StyledGrid>
    </HeaderStyle>
  )
}
