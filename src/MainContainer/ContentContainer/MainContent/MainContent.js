import React from 'react'
import Grid from '@material-ui/core/Grid'
import { IndicatorContainer } from './IndicatorContainer/IndicatorContainer'
import { EUacknowledgement } from './EUacknowledgement/EUacknowledgement'
import { DecisionContainer } from './DecisionContainer/DecisionContainer'
import { GoalContainer } from './GoalContainer/GoalContainer'
import { MapContainer } from './MapContainer/MapContainer'
import { TimelineContainer } from './TimelineContainer/TimelineContainer'

export const MainContent = () => (
  <Grid
    container
    direction="row"
    justify="space-between"
    alignItems="flex-start"
  >
    <Grid
      container
      item
      direction="column"
      justify="space-between"
      alignItems="flex-start"
      xs={2}
    >
      <IndicatorContainer />
      <EUacknowledgement />
    </Grid>
    <Grid
      container
      item
      direction="column"
      justify="space-between"
      alignItems="flex-start"
      xs={4}
    >
      <DecisionContainer />
      <GoalContainer />
    </Grid>
    <Grid
      container
      item
      direction="column"
      justify="space-between"
      alignItems="flex-start"
      xs={6}
    >
      <TimelineContainer />
      <MapContainer />
    </Grid>
  </Grid>
)
