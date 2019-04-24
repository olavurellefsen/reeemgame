import React, { useContext } from 'react'
import Context from '../../../../Context/Context'
import { ReactComponent as Europe } from './Map/europe.svg'
import { Container, StyledEurope } from './MapContainer.style'
import { getMapColors } from './MapValues'
import { Legend } from './legend'

export const MapContainer = () => {
  const [state] = useContext(Context)
  const currentYear = state.currentYear
  const mapColors = getMapColors(
    state.selectedIndicator,
    state.selectedScenario,
    currentYear
  )

  return (
    <Container>
      <StyledEurope colors={mapColors}>
        <Europe />
        <Legend maxValue={1000} minValue={200} size={8} unit="kg" />
      </StyledEurope>
    </Container>
  )
}
