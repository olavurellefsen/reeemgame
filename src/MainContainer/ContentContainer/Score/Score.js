import React from 'react'
import {
  StyledGrid,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableRow,
} from './Score.style'

export const Score = () => {
  var scoreList = JSON.parse(localStorage.getItem('score'))
  return (
    <StyledGrid>
      <StyledTable data-testid="scoreTable">
        <StyledTableHead>
          <StyledTableRow index={0}>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Economic</StyledTableCell>
            <StyledTableCell>Environmental</StyledTableCell>
            <StyledTableCell>Social</StyledTableCell>
            <StyledTableCell>Sum</StyledTableCell>
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>
          {scoreList && scoreList.length > 0
            ? scoreList.map((s, i) => (
                <StyledTableRow key={i} index={1 + i}>
                  <StyledTableCell>{s.date}</StyledTableCell>
                  <StyledTableCell>{s.weightedScores.eco}</StyledTableCell>
                  <StyledTableCell>{s.weightedScores.env}</StyledTableCell>
                  <StyledTableCell>{s.weightedScores.soc}</StyledTableCell>
                  <StyledTableCell>{s.weightedScores.sum}</StyledTableCell>
                </StyledTableRow>
              ))
            : null}
        </StyledTableBody>
      </StyledTable>
    </StyledGrid>
  )
}
