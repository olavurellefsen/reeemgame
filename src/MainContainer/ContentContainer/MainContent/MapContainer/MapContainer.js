import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Context from '../../../../Context/Context'
import { ReactComponent as Europe } from './Map/europe.svg'
import { Container, StyledEurope, IndicatorHeader } from './MapContainer.style'
import { getMapColors, getIndicatorParams } from './MapValues'
import eunochCountries from '../../../../data/eunochcountries.json'
import { Legend } from './legend'
import { IndicatorInfo } from './IndicatorInfo'
import Popper from '@material-ui/core/Popover'
import { CountryPopup } from './CountryPopup'

export const MapContainer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorPosition, setAnchorPosition] = React.useState(null)
  const [selectedCountry, setSelectedCountry] = React.useState(null)
  const { t } = useTranslation()
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
  const popupWidth = 520
  const popupHeight = 440
  function handleClick(event) {
    setAnchorEl(event.currentTarget)
    setAnchorPosition({
      left: Math.min(event.clientX, width - popupWidth),
      top: Math.min(event.clientY, height - popupHeight),
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
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorPosition={anchorPosition}
        anchorReference={'anchorPosition'}
        style={{
          width: popupWidth,
          height: popupHeight,
        }}
        modal={null}
        hideBackdrop={true}
        disableBackdropClick={true}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        modifiers={{
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
          },
        }}
      >
        <CountryPopup
          country={selectedCountry}
          onClose={handleClose}
          style={{
            width: '600px !important',
            height: '500px important',
            position: 'absolute',
          }}
        />
      </Popper>
      <StyledEurope colors={mapColors}>
        <IndicatorHeader>
          {state.selectedIndicator &&
            t('indicatorHeader.' + state.selectedIndicator)}
          &nbsp;
        </IndicatorHeader>
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
  let foundCountry = eunochCountries.find(element => element.code === country)

  return foundCountry ? true : false
}
