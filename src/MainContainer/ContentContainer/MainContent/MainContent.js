import React, { useContext, useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Context from './../../../Context/Context'
import { IndicatorContainer } from './IndicatorContainer/IndicatorContainer'
import { EUacknowledgement } from './EUacknowledgement/EUacknowledgement'
import { ScoreContainer } from './ScoreContainer/ScoreContainer'
import { Share } from './Share'
import { DecisionContainer } from './DecisionContainer/DecisionContainer'
import { WeightChart } from './WeightChart/WeightChart'
import { TryAgain } from './TryAgain/TryAgain'
import { MapContainer } from './MapContainer/MapContainer'
import { TimelineContainer } from './TimelineContainer/TimelineContainer'
import styled from 'styled-components'
import useMediaQuery from '@mui/material/useMediaQuery'
import StartModal from './StartModal/StartModal'
import PropTypes from 'prop-types'
import { calculateScore } from '../../../utils/CalculateScore'
import { saveScore } from '../../../utils/SaveScore'

const StyledGrid = styled(Grid)`
  && {
    order: ${props => props.order};
  }
`

export const MainContent = props => {
  const [state, dispatch] = useContext(Context)
  useEffect(() => {
    if (props.weights.eco && props.weights.soc && props.weights.env) {
      dispatch({
        type: 'setWeights',
        eco: Number(props.weights.eco),
        soc: Number(props.weights.soc),
        env: Number(props.weights.env),
      })
    }
  }, [dispatch, props.weights.eco, props.weights.env, props.weights.soc])
  useEffect(() => {
    dispatch({
      type: 'setCombinedScore',
      score: calculateScore(state.selectedScenario, state.weights),
    })
    console.log(state.selectedScenario)
    if (state.currentDecision === '2050' && !state.scoreSaved) {
      saveScore(state.selectedScenario, state.weights, state.choices)
      dispatch({
        type: 'setScoreSaved',
        scoreSaved: true,
      })
    }
  }, [
    dispatch,
    state.weights,
    state.selectedScenario,
    state.currentDecision,
    state.scoreSaved,
  ])
  const wide = useMediaQuery('(min-width:960px)')
  const [startModal, setStartModal] = useState(false)
  const onCloseStartModal = () => {
    setStartModal(false)
  }
  const onOpenStartModal = () => {
    setStartModal(true)
  }
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
        alignItems="center"
        lg={4}
        md={8}
        sm={12}
        order={wide ? 1 : 1}
      >
        {['2030', '2040', '2050'].includes(state.currentDecision) && (
          <ScoreContainer
            currentScore={state.combinedScore}
            currentDecision={state.currentDecision}
          />
        )}
        {state.gameState === 'over' && <Share />}
        {state.gameState !== 'over' && (
          <DecisionContainer onOpenStartModal={onOpenStartModal} />
        )}
        {state.gameState !== 'start' && <WeightChart weights={state.weights} />}
        {state.gameState === 'over' && <TryAgain />}
        <StartModal
          open={startModal}
          onClose={onCloseStartModal}
          weights={state.weights}
        />
        {/* <GoalContainer
          selectedScenario={state.selectedScenario}
          weights={state.weights}
        /> */}
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
MainContent.propTypes = {
  weights: PropTypes.object,
}
