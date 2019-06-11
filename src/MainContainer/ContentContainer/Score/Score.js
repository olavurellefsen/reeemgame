import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  StyledGrid,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableRow,
} from './Score.style'

export const Score = () => {
  const { t } = useTranslation()
  var scoreList = JSON.parse(localStorage.getItem('score'))
  return (
    <StyledGrid>
      <StyledTable data-testid="scoreTable">
        <StyledTableHead>
          <StyledTableRow index={0}>
            <StyledTableCell>{t('score.date')}</StyledTableCell>
            <StyledTableCell>{t('score.economic.long')}</StyledTableCell>
            <StyledTableCell>{t('score.environmental.long')}</StyledTableCell>
            <StyledTableCell>{t('score.social.long')}</StyledTableCell>
            <StyledTableCell>{t('score.sum.long')}</StyledTableCell>
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
