import React, { useContext } from 'react'
//import ProgressBar from 'react-bootstrap/ProgressBar'
import Slider from '@material-ui/lab/Slider'
import Context from '../../../../Context/Context'
import {
  Container,
  Label,
  LabelContainer,
  SliderContainer,
} from './TimelineContainer.style'

export const TimelineContainer = () => {
  const [state, dispatch] = useContext(Context)

  const years = state.timeline
  var prevYear = 2010
  const progressInstance = (
    <Container>
      <LabelContainer>
        {years.map(function(year) {
          //Prevent labels too close to each other
          if (year - prevYear >= 5) {
            prevYear = year
            return (
              <Label
                year={year}
                min={2015}
                max={2050}
                key={'label' + year}
                selected={parseInt(year) === state.currentYear}
                future={parseInt(year) > state.maxYear}
              >
                {year}
              </Label>
            )
          } else {
            return null
          }
        })}
      </LabelContainer>
      <SliderContainer>
        <Slider
          value={parseInt(state.currentYear)}
          min={2015}
          max={2050}
          step={1}
          onChange={(event, value) => {
            if (value <= state.maxYear)
              dispatch({ type: 'setCurrentYear', year: value })
          }}
          disabled={false}
        />
      </SliderContainer>
    </Container>
  )
  return progressInstance
}
