import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Context from '../../../../Context/Context'
import { Container, LeftMenuItem } from './IndicatorContainer.style'

export const IndicatorContainer = () => {
  const [state, dispatch] = useContext(Context)
  const availableIndicators = ['Electricity demands', 'Emission Limit']
  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="flex-start"
      >
        {availableIndicators.map((indicator, i) => (
          <Grid item key={i}>
            <LeftMenuItem
              onClick={() => {
                let newIndicator = indicator
                if (indicator === state.selectedIndicator) {
                  newIndicator = null
                }
                dispatch({
                  type: 'setSelectedIndicator',
                  name: newIndicator,
                })
              }}
              selected={indicator === state.selectedIndicator}
            >
              {indicator}
            </LeftMenuItem>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
