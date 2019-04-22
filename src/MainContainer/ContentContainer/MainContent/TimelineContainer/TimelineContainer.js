import React, { useContext } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Context from '../../../../Context/Context'
import {
  Container,
  Label,
  LabelContainer,
  Timeline,
} from './TimelineContainer.style'
import Slider from '@material-ui/lab/Slider'

export const TimelineContainer = () => {
  const [state, dispatch] = useContext(Context)

  const now = parseInt(state.currentDecision)
  const years = state.decisionCycle
  var prevYear = 2015

  const progressInstance = (
    <Container>
      <LabelContainer>
        {years.map(function(year) {
          //Prevent labels too close to each other
          if (year - prevYear >= 5) {
            prevYear = year
            return (
              <Label year={year} min={2015} max={2050}>
                {year}
              </Label>
            )
          } else {
            return null
          }
        })}
      </LabelContainer>
      <Slider
        value={parseInt(state.chosenYear)}
        min={2015}
        max={2050}
        step={1}
        onChange={(event, value) => {
          if (value <= now) {
            dispatch({ type: 'chooseYear', year: value })
          }
        }}
        disabled={false}
      />
      <ProgressBar now={now} label={`${now}`} min={2015} max={2050} />
      <p>Looking at: {parseInt(state.chosenYear)}</p>
    </Container>
  )
  return progressInstance
}
