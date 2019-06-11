import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import { EUacknowledgement } from './EUacknowledgement/EUacknowledgement'
import { MapContainer } from './MapContainer/MapContainer'
import styled from 'styled-components'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import { PropTypes } from 'prop-types'
import { Container, TextContainer, LinkButton } from './SharedPage.style'

import Button from '@material-ui/core/Button'
const StyledGrid = styled(Grid)`
  && {
    order: ${props => props.order};
  }
`

const buildURL = (eco, soc, env) => {
  return '?eco=' + eco + '&soc=' + soc + '&env=' + env
}

export const SharedPage = props => {
  const { t } = useTranslation()
  const wide = useMediaQuery('(min-width:960px)')
  const eco = props.sharedValues.eco
  const soc = props.sharedValues.soc
  const env = props.sharedValues.env
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <StyledGrid
        container
        item
        direction="column"
        justify="space-between"
        alignItems="flex-start"
        lg={2}
        md={4}
        sm={12}
        order={wide ? 1 : 3}
      >
        <EUacknowledgement />
      </StyledGrid>
      <StyledGrid
        container
        item
        direction="column"
        justify="space-between"
        alignItems="flex-start"
        lg={4}
        md={8}
        sm={12}
        order={wide ? 2 : 1}
      >
        <Container>
          <TextContainer>Weight Eco: {eco}</TextContainer>
          <TextContainer>Weight Soc: {soc}</TextContainer>
          <TextContainer>Weight Env: {env}</TextContainer>
          <TextContainer>Score: {props.sharedValues.score}</TextContainer>
          <Button>
            <LinkButton to={'/' + buildURL(eco, soc, env)}>
              {t('shared.tryGameButton')}
            </LinkButton>
          </Button>
        </Container>
      </StyledGrid>
      <StyledGrid
        container
        item
        direction="column"
        justify="space-between"
        alignItems="flex-start"
        lg={6}
        md={12}
        order={wide ? 3 : 2}
      >
        <MapContainer />
      </StyledGrid>
    </Grid>
  )
}
SharedPage.propTypes = {
  sharedValues: PropTypes.object,
}
