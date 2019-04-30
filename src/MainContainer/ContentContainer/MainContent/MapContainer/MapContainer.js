import React, { useContext } from 'react'
import Context from '../../../../Context/Context'
import { ReactComponent as Europe } from './Map/europe.svg'
import { Container, StyledEurope } from './MapContainer.style'
import { getMapColors } from './MapValues'
import { Legend } from './legend'
import sampleData from './../../../../data/sampledata'
import { IndicatorInfo } from './IndicatorInfo'

export const MapContainer = () => {
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
      <StyledEurope colors={mapColors}>
        <div
          id="map"
          onClick={event => {
            event.preventDefault()
            alert(
              JSON.stringify(
                mapColors.filter(element => element.code === event.target.id)
              )
            )
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
