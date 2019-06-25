import React, { useContext, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Context from './../../../Context/Context'
import { IndicatorContainer } from './IndicatorContainer/IndicatorContainer'
import { EUacknowledgement } from './EUacknowledgement/EUacknowledgement'
import { DecisionContainer } from './DecisionContainer/DecisionContainer'
import { GoalContainer } from './GoalContainer/GoalContainer'
import { MapContainer } from './MapContainer/MapContainer'
import { TimelineContainer } from './TimelineContainer/TimelineContainer'
import styled from 'styled-components'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import StartModal from './StartModal/StartModal'
import PropTypes from 'prop-types'

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
        type: 'reset',
      })
      dispatch({
        type: 'setWeights',
        eco: Number(props.weights.eco),
        soc: Number(props.weights.soc),
        env: Number(props.weights.env),
      })
    }
  }, [dispatch, props.weights.eco, props.weights.env, props.weights.soc])
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
        <DecisionContainer
          onOpenStartModal={onOpenStartModal}
          weights={state.weights}
        />
        {state.gameState === 'over' ? (
          <GoalContainer
            selectedScenario={state.selectedScenario}
            weights={state.weights}
          />
        ) : null}
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
        order={wide ? 3 : 2}
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
