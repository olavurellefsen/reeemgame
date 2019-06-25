import React from 'react'
import { Container } from './GoalContainer.style'
import { GoalSummary } from './GoalSummary/GoalSummary'
import PropTypes from 'prop-types'

export const GoalContainer = ({ selectedScenario, weights }) => (
  <Container>
    <GoalSummary selectedScenario={selectedScenario} weights={weights} />
  </Container>
)
GoalContainer.propTypes = {
  selectedScenario: PropTypes.string.isRequired,
  weights: PropTypes.object.isRequired,
}
