import React, { useContext } from 'react'
import Context from '../../../../Context/Context'
import { ReactComponent as Europe } from './Map/europe.svg'
import { Container, StyledEurope } from './MapContainer.style'
import sampleData from '../../../../data/sampledata.json'
import colorScale from '../../../../data/colorScale.json'

const convertToColor = (value, min, max) => {
  const selectedColor = Math.round(
    ((value - min) / (max - min)) * colorScale.length
  )
  return colorScale[selectedColor]
}

const sampleColors = currentYear => {
  const sampleData2 = sampleData
    .filter(
      country =>
        country.Parameter === 'SpecifiedAnnual Demand' &&
        country.Scenario === 'C0T0E0'
    )
    .map(country => ({
      code: country.Country.toLowerCase(),
      color: convertToColor(country[currentYear], 90, 400),
    }))
  return sampleData2
}

export const MapContainer = () => {
  const [state] = useContext(Context)
  const currentYear = parseInt(state.currentDecision)

  return (
    <Container>
      <StyledEurope colors={sampleColors(currentYear)}>
        <Europe />
      </StyledEurope>
    </Container>
  )
}
