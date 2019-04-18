import React from 'react'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { GoalHeader, IntroText } from './GoalSummary.style'

export const GoalSummary = () => {
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
            <td>21%</td>
            <td>
              <ProgressBar now={321} label={`${321}`} min={0} max={1000} />
            </td>
          </tr>
          <tr>
            <td>Social</td>
            <td>38%</td>
            <td>
              <ProgressBar now={432} label={`${432}`} min={0} max={1000} />
            </td>
          </tr>
          <tr>
            <td>Environmental</td>
            <td>41%</td>
            <td>
              <ProgressBar now={210} label={`${210}`} min={0} max={1000} />
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
