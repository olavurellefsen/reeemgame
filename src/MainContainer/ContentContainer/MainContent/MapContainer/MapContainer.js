import React, { useContext } from 'react'
import Context from '../../../../Context/Context'
import { ReactComponent as Europe } from './Map/europe.svg'
import { Container, StyledEurope } from './MapContainer.style'
import { getMapColors } from './MapValues'
import { Legend } from './legend'
import sampleData from './../../../../data/sampledata'
import { IndicatorInfo } from './IndicatorInfo'
import Popover from '@material-ui/core/Popover'
import { CountryPopup } from './CountryPopup'

export const MapContainer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorPosition, setAnchorPosition] = React.useState(null)
  const [selectedCountry, setSelectedCountry] = React.useState(null)
  const [hoverOn, setHoverOn] = React.useState(null)
  var timer = null

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
    setAnchorPosition({
      left: Math.min(event.clientX, window.innerHeight + 450),
      top: Math.min(event.clientY, window.innerHeight - 400),
    })
    setSelectedCountry(event.target.id)
  }
  function handleClose() {
    setAnchorEl(null)
    setAnchorPosition(null)
    setHoverOn(null)
  }
  function slowClose() {
    setTimeout(function() {
      handleClose()
    }, 2000)
  }
  // function openPopup(anchor, position, id) {
  //   setAnchorEl(anchor)
  //   setAnchorPosition(position)
  //   setSelectedCountry(id)
  //   console.log('open')
  // }
  // function onMouseMove(event) {
  //   if (!hoverOn || hoverOn !== event.target.id) {
  //     if (timer) clearTimeout(timer)
  //     setHoverOn(event.target.id)
  //     const anchor = event.currentTarget
  //     const position = { left: event.clientX, top: event.clientY }
  //     const id = event.target.id
  //     timer = setTimeout(function() {
  //       openPopup(anchor, position, id)
  //     }, 1000)
  //   }
  // }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : null

  const [state] = useContext(Context)
  const currentYear = state.currentYear
  const mapColors = getMapColors(
    state.selectedIndicator,
    state.selectedScenario,
    currentYear
  )

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
        <CountryPopup country={selectedCountry} onClose={handleClose} />
      </Popover>
      <StyledEurope colors={mapColors}>
        <Europe
          onClick={event => {
            if (event.target.id) {
              event.preventDefault()
              handleClick(event)
            }
          }}
        />
        {state.selectedIndicator ? (
          <Legend
            maxValue={lp.max}
            minValue={lp.min}
            size={lp.steps}
            unit={lp.unit}
          />
        ) : null}
        <IndicatorInfo
          visible={false}
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
