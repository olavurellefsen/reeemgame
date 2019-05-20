import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import {
  HeaderStyle,
  TitleContainer,
  HeaderMenuItemLink,
  TextContainer,
  Divider,
} from './Header.style'
import logo from './REEEMlogo.transparent.1.svg'
import { Languages } from './LanguagesContainer/LanguagesContainer'

export const Header = () => {
  const { t } = useTranslation()
  return (
    <HeaderStyle>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <TitleContainer>
            <Link to="/">
              <img src={logo} alt="logo" width={200} height={40} />
            </Link>
            <TextContainer>{t('header.title')}</TextContainer>
          </TitleContainer>
        </Grid>
        <Grid item>
          <Grid
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
            <HeaderMenuItemLink to="/">{t('header.share')}</HeaderMenuItemLink>
          </Grid>
        </Grid>
      </Grid>
    </HeaderStyle>
  )
}
