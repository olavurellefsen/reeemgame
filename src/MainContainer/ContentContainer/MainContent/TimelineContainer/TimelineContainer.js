import React, { useContext } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Context from '../../../../Context/Context'
import { Container, Label, LabelContainer } from './TimelineContainer.style'

const calculateCurrentYear = (event, minYear, maxYear, now) => {
  const rect = event.target.getBoundingClientRect()
  const newPoint = event.clientX
  const leftPoint = rect.x
  if (event.target.id === 'beforenow') {
    // between minimum year and the currently selected year
    return Math.floor(
      minYear + ((now - minYear) * (newPoint - leftPoint)) / rect.width
    )
  }
  if (event.target.id === 'afternow') {
    return Math.round(
      now + ((maxYear - now) * (newPoint - leftPoint)) / rect.width
    )
  }

  return now
}

export const TimelineContainer = () => {
  const [state, dispatch] = useContext(Context)

  const now = state.currentYear
  const maxYear = state.maxYear
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
              <Label year={year} min={2015} max={2050} key={'label' + year}>
                {year}
              </Label>
            )
          } else {
            return null
          }
        })}
      </LabelContainer>
      <ProgressBar>
        <ProgressBar
          id="beforenow"
          key={1}
          now={now}
          label={`${now}`}
          min={2015}
          max={2050}
          onClick={event => {
            dispatch({
              type: 'setCurrentYear',
              year: calculateCurrentYear(event, 2015, now, now),
            })
          }}
        />
        <ProgressBar
          id="afternow"
          key={2}
          variant="warning"
          now={maxYear - (now - 2015)}
          min={2015}
          max={2050}
          onClick={event => {
            dispatch({
              type: 'setCurrentYear',
              year: calculateCurrentYear(event, now, maxYear, now),
            })
          }}
        />
      </ProgressBar>
    </Container>
  )
  return progressInstance
}
