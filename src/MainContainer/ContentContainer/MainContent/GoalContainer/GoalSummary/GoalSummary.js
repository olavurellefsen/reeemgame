import React, { useContext } from 'react'
import Context from './../../../../../Context/Context'
import {
  GoalHeader,
  IntroText,
  StyledGrid,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableRow,
} from './GoalSummary.style'

export const GoalSummary = () => {
  const [state] = useContext(Context)
  return (
    <StyledGrid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start"
    >
      <GoalHeader>Goal</GoalHeader>
      <IntroText>
        Your goal is to maximise the score in 2050. Your score is calculated as
        the weighted average of the economic, social, and enviromental scores,
        which can be seen below.
      </IntroText>
      <StyledTable>
        <StyledTableHead>
          <StyledTableRow>
            <StyledTableCell />
            <StyledTableCell>Weight</StyledTableCell>
            <StyledTableCell>Weighted Score</StyledTableCell>
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>
          <StyledTableRow>
            <StyledTableCell>Economic</StyledTableCell>
            <StyledTableCell>{state.weights.eco}%</StyledTableCell>
            <StyledTableCell>{state.weightedScores.eco}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Social</StyledTableCell>
            <StyledTableCell>{state.weights.soc}%</StyledTableCell>
            <StyledTableCell>{state.weightedScores.soc}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Environmental</StyledTableCell>
            <StyledTableCell>{state.weights.env}%</StyledTableCell>
            <StyledTableCell>{state.weightedScores.env}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell />
            <StyledTableCell />
            <StyledTableCell>{state.weightedScores.sum}</StyledTableCell>
          </StyledTableRow>
        </StyledTableBody>
      </StyledTable>
    </StyledGrid>
  )
}
