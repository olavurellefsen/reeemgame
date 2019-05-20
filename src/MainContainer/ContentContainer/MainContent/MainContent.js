import React from 'react'
import Grid from '@material-ui/core/Grid'
import { IndicatorContainer } from './IndicatorContainer/IndicatorContainer'
import { EUacknowledgement } from './EUacknowledgement/EUacknowledgement'
import { DecisionContainer } from './DecisionContainer/DecisionContainer'
import { GoalContainer } from './GoalContainer/GoalContainer'
import { MapContainer } from './MapContainer/MapContainer'
import { TimelineContainer } from './TimelineContainer/TimelineContainer'
import styled from 'styled-components'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import { Languages } from './../../HeaderContainer/LanguagesContainer/LanguagesContainer'

const StyledGrid = styled(Grid)`
  && {
    order: ${props => props.order};
  }
`

export const MainContent = () => {
  const wide = useMediaQuery('(min-width:960px)')
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
        <Languages />
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
        <DecisionContainer />
        <GoalContainer />
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
