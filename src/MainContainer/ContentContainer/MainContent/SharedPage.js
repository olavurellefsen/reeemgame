import React, { useContext, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import { EUacknowledgement } from './EUacknowledgement/EUacknowledgement'
import { MapContainer } from './MapContainer/MapContainer'
import styled from 'styled-components'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import { PropTypes } from 'prop-types'
import { Container, TextContainer, LinkButton } from './SharedPage.style'
import { TimelineContainer } from './TimelineContainer/TimelineContainer'
import Context from './../../../Context/Context'

import Button from '@material-ui/core/Button'
import { IndicatorContainer } from './IndicatorContainer/IndicatorContainer'
const StyledGrid = styled(Grid)`
  && {
    order: ${props => props.order};
  }
`

const buildURL = (eco, soc, env) => {
  return '?eco=' + eco + '&soc=' + soc + '&env=' + env
}
export const SharedPage = props => {
  const [state, dispatch] = useContext(Context)
  const { t } = useTranslation()
  const wide = useMediaQuery('(min-width:960px)')
  const ecoWeight = props.sharedValues.eco
  const socWeight = props.sharedValues.soc
  const envWeight = props.sharedValues.env
  const scenario = props.sharedValues.scenario

  useEffect(() => {
    dispatch({
      type: 'setStateToShared',
      scenario: scenario,
      eco: ecoWeight,
      soc: socWeight,
      env: envWeight,
    })
  }, [dispatch, ecoWeight, envWeight, scenario, socWeight])
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
        <IndicatorContainer />
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
          <TextContainer>Weight Eco: {ecoWeight}</TextContainer>
          <TextContainer>Weight Soc: {socWeight}</TextContainer>
          <TextContainer>Weight Env: {envWeight}</TextContainer>
          <TextContainer>Score: {props.sharedValues.score}</TextContainer>
          <Button>
            <LinkButton to={'/' + buildURL(ecoWeight, socWeight, envWeight)}>
              {t('share.tryGameButton')}
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
        <TimelineContainer />
        <MapContainer />
      </StyledGrid>
    </Grid>
  )
}
SharedPage.propTypes = {
  sharedValues: PropTypes.object,
}
