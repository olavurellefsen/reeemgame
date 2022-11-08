import React, { useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import { EUacknowledgement } from './EUacknowledgement/EUacknowledgement'
import { MapContainer } from './MapContainer/MapContainer'
import styled from 'styled-components'
import useMediaQuery from '@mui/material/useMediaQuery'
//import { createListOfScenarios } from './../../../utils/ScoreUtilities'
import { PropTypes } from 'prop-types'
import {
  TextContainer,
  StyledButton,
  LinkButton,
  IntroText,
  Header,
} from './SharedPage.style'
import { TimelineContainer } from './TimelineContainer/TimelineContainer'
import Context from './../../../Context/Context'
import { IndicatorContainer } from './IndicatorContainer/IndicatorContainer'
import { calculateScore } from '../../../utils/CalculateScore'

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

  // const decisionRanks = createListOfScenarios(state.weights)
  // const score = decisionRanks.find(e => {
  //   return e.scenario === state.selectedScenario
  // }).score
  // const optimalScore = decisionRanks[0].score
  useEffect(() => {
    dispatch({
      type: 'setStateToShared',
      eco: ecoWeight,
      soc: socWeight,
      env: envWeight,
    })
  }, [dispatch, ecoWeight, envWeight, socWeight])
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
        order={wide ? 3 : 3}
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
        order={wide ? 1 : 1}
      >
        <StyledGrid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-start"
        >
          <Header>{t('share.header')}</Header>
          <IntroText>{t('share.intro')}</IntroText>
          <TextContainer>
            {t('share.myScore') + ' ' + calculateScore(scenario, state.weights)}
          </TextContainer>
          <TextContainer>{t('share.optimalScore') + ' 100'}</TextContainer>
          <StyledButton>
            <LinkButton to={'/' + buildURL(ecoWeight, socWeight, envWeight)}>
              {t('share.tryGameButton')}
            </LinkButton>
          </StyledButton>
        </StyledGrid>
      </StyledGrid>
      <StyledGrid
        container
        item
        direction="column"
        justify="space-between"
        alignItems="flex-start"
        lg={6}
        md={12}
        order={wide ? 2 : 2}
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
