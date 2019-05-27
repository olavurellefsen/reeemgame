import React, { useContext } from 'react'
import Context from '../../../../Context/Context'
import { ReactComponent as Europe } from './Map/europe.svg'
import { Container, StyledEurope } from './MapContainer.style'
import { getMapColors } from './MapValues'
import { Legend } from './legend'
import sampleData from './../../../../data/sampledata'
import { IndicatorInfo } from './IndicatorInfo'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'

export const MapContainer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorPosition, setAnchorPosition] = React.useState(null)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
    setAnchorPosition({ left: event.clientX, top: event.clientY })
  }

  function handleClose() {
    setAnchorEl(null)
    setAnchorPosition(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : null

  const [state] = useContext(Context)
  const currentYear = state.currentYear
  const mapColors = getMapColors(
    state.selectedIndicator,
    state.selectedScenario,
    currentYear
  )
  //alert(state.selectedIndicator)
  var lp
  if (state.selectedIndicator) lp = getLegendPara(state.selectedIndicator)
  return (
    <Container>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorPosition={anchorPosition}
        anchorReference={'anchorPosition'}
      >
        <Typography>The content of the Popover.</Typography>
      </Popover>
      <StyledEurope colors={mapColors}>
        <div
          id="map"
          onClick={event => {
            event.preventDefault()
            handleClick(event)
          }}
        >
          <Europe />
        </div>
        {state.selectedIndicator ? (
          <Legend
            maxValue={lp.max}
            minValue={lp.min}
            size={lp.steps}
            unit={lp.unit}
          />
        ) : null}
        <IndicatorInfo
          visible={true}
          unit="kg"
          value="100"
          year={currentYear}
        />
      </StyledEurope>
    </Container>
  )
}

const getLegendPara = indicator => {
  if (indicator === 'Electricity demands') indicator = 'SpecifiedAnnual Demand'
  else if (indicator === 'Emission Limit') indicator = 'AnnualEmissionLimit'
  return {
    unit: sampleData.find(element => element.Parameter === indicator).Unit,
    max: sampleData.find(element => element.Parameter === indicator).max,
    min: sampleData.find(element => element.Parameter === indicator).min,
    steps: sampleData.find(element => element.Parameter === indicator).steps,
  }
}
