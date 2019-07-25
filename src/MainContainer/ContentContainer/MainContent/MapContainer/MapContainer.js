import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../../Context/Context'
import { ReactComponent as Europe } from './Map/europe.svg'
import { Container, StyledEurope } from './MapContainer.style'
import { getMapColors, getIndicatorParams } from './MapValues'
//import eunochCountries from '../../../../data/eunochcountries.json'
import { Legend } from './legend'
//import sampleData from './../../../../data/sampledata'
//import oilData from '../../../../data/oil.json'
import { IndicatorInfo } from './IndicatorInfo'
import Popover from '@material-ui/core/Popover'
import { CountryPopup } from './CountryPopup'
//import dataInfo from './../../../../data/dataInfo'

export const MapContainer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorPosition, setAnchorPosition] = React.useState(null)
  const [selectedCountry, setSelectedCountry] = React.useState(null)
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    )

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
  }

  const { height, width } = useWindowDimensions()
  function handleClick(event) {
    setAnchorEl(event.currentTarget)
    setAnchorPosition({
      left: Math.min(event.clientX, width - 520),
      top: Math.min(event.clientY, height - 420),
    })
    setSelectedCountry(event.target.id)
  }
  function handleClose() {
    setAnchorEl(null)
    setAnchorPosition(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : null

  const [state] = useContext(Context)
  const currentYear = state.currentYear

  let tempScenario = state.selectedScenario

  //TODO Important to change when real data has been added
  if (tempScenario !== 'C0T0E0' && tempScenario !== 'C0T0E1')
    tempScenario = 'C0T0E0'
  const mapColors = getMapColors(
    state.selectedIndicator,
    tempScenario,
    currentYear
  )

  var lp
  if (state.selectedIndicator) lp = getIndicatorParams(state.selectedIndicator)
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
            if (
              event.target.id &&
              hasData(
                event.target.id,
                state.selectedIndicator,
                tempScenario,
                state.gameState
              )
            ) {
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
            flipColors={lp.flipColors}
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

const hasData = (country, indicator, selectedScenario, gameState) => {
  /* var data
  if (indicator === 'electricityDemands') {
    indicator = 'SpecifiedAnnual Demand'
    data = sampleData.find(
      element =>
        element.Parameter === indicator &&
        element.Country === country.toUpperCase() &&
        element.Scenario === selectedScenario
    )
  }

  if (indicator === 'emissionLimit' || indicator === 'score') {
    data = eunochCountries.find(element => element.code === country)
  } */
  return true //data ? true : false
}
