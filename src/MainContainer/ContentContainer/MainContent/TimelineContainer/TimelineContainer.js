import React, { useContext, useState } from 'react'
import Context from '../../../../Context/Context'
import {
  Container,
  RowContainer,
  Label,
  LabelContainer,
  SliderContainer,
  StyledSlider,
} from './TimelineContainer.style'
import useInterval from '../../../../utils/useInterval'
import { PlayButton } from './PlayButton'

export const TimelineContainer = () => {
  const [state, dispatch] = useContext(Context)
  //const [animationYear, setAnimationYear] = useState(2015)
  const [animationDelay, setAnimationDelay] = useState(null)
  const defaultAnimationDelay = 500
  const fastForwardDelay = 200

  useInterval(() => {
    tick()
  }, animationDelay)

  const play = () => {
    if (animationDelay) {
      setAnimationDelay(null)
      dispatch({ type: 'setAnimationState', animationState: 'paused' })
    } else {
      setAnimationDelay(defaultAnimationDelay)
      dispatch({ type: 'setAnimationState', animationState: 'running' })
    }
  }
  const fastForward = () => {
    if (animationDelay === defaultAnimationDelay) {
      setAnimationDelay(fastForwardDelay)
      dispatch({ type: 'setAnimationState', animationState: 'fast' })
    } else {
      setAnimationDelay(defaultAnimationDelay)
      dispatch({ type: 'setAnimationState', animationState: 'running' })
    }
  }
  const tick = () => {
    dispatch({ type: 'setCurrentYear', year: state.animationYear })
    if (state.animationYear === state.maxYear)
      dispatch({ type: 'setAnimationYear', animationYear: 2015 })
    else
      dispatch({
        type: 'setAnimationYear',
        animationYear: state.animationYear + 1,
      })
  }
  const years = state.timeline
  var prevYear = 2010
  const progressInstance = (
    <RowContainer>
      <PlayButton
        onStartPause={play}
        onFastForward={fastForward}
        animationState={state.animationState}
      />
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
          <StyledSlider
            value={parseInt(state.currentYear)}
            min={2015}
            max={2050}
            step={1}
            onChange={(event, value) => {
              if (value <= state.maxYear) {
                dispatch({ type: 'setAnimationYear', animationYear: value })
                dispatch({ type: 'setCurrentYear', year: value })
              }
            }}
            disabled={false}
          />
        </SliderContainer>
      </Container>
    </RowContainer>
  )
  return progressInstance
}
