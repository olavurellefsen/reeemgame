import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../../Context/Context'
import { ReactComponent as Europe } from './Map/europe.svg'
import { Container, StyledEurope } from './MapContainer.style'
import { getMapColors } from './MapValues'
import eunochCountries from '../../../../data/eunochcountries.json'
import { Legend } from './legend'
import sampleData from './../../../../data/sampledata'
import { IndicatorInfo } from './IndicatorInfo'
import Popover from '@material-ui/core/Popover'
import { CountryPopup } from './CountryPopup'

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
            if (
              event.target.id &&
              hasData(
                event.target.id,
                state.selectedIndicator,
                state.selectedScenario
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
  if (indicator === 'electricityDemands') indicator = 'SpecifiedAnnual Demand'
  else if (indicator === 'emissionLimit') indicator = 'AnnualEmissionLimit'
  return {
    unit: sampleData.find(element => element.Parameter === indicator).Unit,
    max: sampleData.find(element => element.Parameter === indicator).max,
    min: sampleData.find(element => element.Parameter === indicator).min,
    steps: sampleData.find(element => element.Parameter === indicator).steps,
  }
}

const hasData = (country, indicator, selectedScenario) => {
  var data
  if (indicator === 'electricityDemands') {
    indicator = 'SpecifiedAnnual Demand'
    data = sampleData.find(
      element =>
        element.Parameter === indicator &&
        element.Country === country.toUpperCase() &&
        element.Scenario === selectedScenario
    )
  }

  if (indicator === 'emissionLimit') {
    data = eunochCountries.find(element => element.code === country)
  }
  return data ? true : false
}
