import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import Context from './../../../../../Context/Context'
import { Decisions } from './../../DecisionContainer/DecisionForm/Decisions'
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
  const { t } = useTranslation()

  return (
    <StyledGrid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start"
    >
      <GoalHeader>
        {t('goal.title')}
        {state.selectedScenario}
      </GoalHeader>
      <IntroText>{t('goal.summary')}</IntroText>
      <IntroText>Decisions taken</IntroText>
      <IntroText>{JSON.stringify(Decisions)}</IntroText>
      {/* <IntroText>1 {Decisions[1].individualDecisions[0].introText}</IntroText>
      <IntroText>2 {Decisions[1].individualDecisions[1].introText}</IntroText>
      <IntroText>3 {Decisions[1].individualDecisions[1].introText}</IntroText> */}
      <StyledTable>
        <StyledTableHead>
          <StyledTableRow>
            <StyledTableCell />
            <StyledTableCell>{t('goal.weight')}</StyledTableCell>
            <StyledTableCell>{t('goal.weightedScore')}</StyledTableCell>
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>
          <StyledTableRow>
            <StyledTableCell>{t('score.economic')}</StyledTableCell>
            <StyledTableCell>{state.weights.eco}%</StyledTableCell>
            <StyledTableCell>{state.weightedScores.eco}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('score.social')}</StyledTableCell>
            <StyledTableCell>{state.weights.soc}%</StyledTableCell>
            <StyledTableCell>{state.weightedScores.soc}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('score.environmental')}</StyledTableCell>
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
