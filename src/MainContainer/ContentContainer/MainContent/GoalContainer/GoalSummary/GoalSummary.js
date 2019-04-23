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
            <th>Weight</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Economic</td>
            <td>{state.weights.eco}%</td>
            <td>
              <ProgressBar
                now={state.weights.eco}
                label={`${state.weights.eco}`}
                min={0}
                max={100}
              />
            </td>
          </tr>
          <tr>
            <td>Social</td>
            <td>{state.weights.soc}%</td>
            <td>
              <ProgressBar
                now={state.weights.soc}
                label={`${state.weights.soc}`}
                min={0}
                max={100}
              />
            </td>
          </tr>
          <tr>
            <td>Environmental</td>
            <td>{state.weights.env}%</td>
            <td>
              <ProgressBar
                now={state.weights.env}
                label={`${state.weights.env}`}
                min={0}
                max={100}
              />
            </td>
          </tr>
          <tr>
            <td />
            <td />
            <td>
              <ProgressBar
                variant="success"
                now={333}
                label={`${333}`}
                min={0}
                max={1000}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </Col>
  )
}
