import React, { useContext } from 'react'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Context from './../../../../../Context/Context'

import { GoalHeader, IntroText } from './GoalSummary.style'

export const GoalSummary = () => {
  const [state] = useContext(Context)
  return (
    <Col>
      <GoalHeader>Goal</GoalHeader>
      <IntroText>
        Your goal is to maximise the score in 2050. Your score is calculated as
        the weighted average of the economic, social, and enviromental scores,
        which can be seen below.
      </IntroText>
      <Table>
        <thead>
          <tr>
            <th />
            <th>Score</th>
            <th>Weight</th>
            <th>Weigted Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Economic</td>
            <td>{state.scores.eco}</td>
            <td>{state.weights.eco}%</td>
            <td>
              <ProgressBar
                now={state.weightedScores.eco}
                label={`${state.weightedScores.eco}`}
                min={0}
                max={500}
              />
            </td>
          </tr>
          <tr>
            <td>Social</td>
            <td>{state.scores.soc}</td>
            <td>{state.weights.soc}%</td>
            <td>
              <ProgressBar
                now={state.weightedScores.soc}
                label={`${state.weightedScores.soc}`}
                min={0}
                max={500}
              />
            </td>
          </tr>
          <tr>
            <td>Environmental</td>
            <td>{state.scores.env}</td>
            <td>{state.weights.env}%</td>
            <td>
              <ProgressBar
                now={state.weightedScores.env}
                label={`${state.weightedScores.env}`}
                min={0}
                max={500}
              />
            </td>
          </tr>
          <tr>
            <td />
            <td />
            <td />
            <td>
              <ProgressBar
                variant="success"
                now={state.weightedScores.sum}
                label={`${state.weightedScores.sum}`}
                min={0}
                max={500}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </Col>
  )
}
