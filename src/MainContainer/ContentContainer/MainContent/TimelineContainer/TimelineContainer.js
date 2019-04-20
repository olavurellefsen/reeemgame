import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Container } from './TimelineContainer.style'

export const TimelineContainer = () => {
  const now = 2019
  const progressInstance = (
    <Container>
      <ProgressBar now={now} label={`${now}`} min={2015} max={2050} />
    </Container>
  )
  return progressInstance
}
