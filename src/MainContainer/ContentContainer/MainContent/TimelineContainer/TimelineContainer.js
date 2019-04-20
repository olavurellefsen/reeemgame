import React, { useContext } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Context from '../../../../Context/Context'
import { Container } from './TimelineContainer.style'

export const TimelineContainer = () => {
  const [state] = useContext(Context)

  const now = parseInt(state.currentDecision)
  const progressInstance = (
    <Container>
      <ProgressBar now={now} label={`${now}`} min={2015} max={2050} />
    </Container>
  )
  return progressInstance
}
