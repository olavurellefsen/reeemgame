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
import { createListOfScenarios } from '../../../../../utils/ScoreUtilities'

const getDecisionsMade = scenario => {
  let ret_decisions = {}
  let decs = Decisions()
  let e = scenario.substring(5, 7)
  ret_decisions.dec1 = {}
  ret_decisions.dec1.name = decs[1].individualDecisions[0].introText
  if (scenario.substring(1, 2) === '0')
    ret_decisions.dec1.decision = decs[1].individualDecisions[0].options[0].text
  else
    ret_decisions.dec1.decision = decs[1].individualDecisions[0].options[1].text

  ret_decisions.dec2 = {}
  ret_decisions.dec2.name = decs[1].individualDecisions[1].introText

  if (scenario.substring(5, 7) < 9)
    ret_decisions.dec2.decision = decs[1].individualDecisions[1].options[0].text
  else if (scenario.substring(5, 7) >= 9 && scenario.substring(5, 7) < 17) {
    ret_decisions.dec2.decision =
      decs[1].individualDecisions[1].options[1].valtextue
    e = -9
  } else {
    ret_decisions.dec2.decision = decs[1].individualDecisions[1].options[2].text
    e = -18
  }

  ret_decisions.dec3 = {}
  ret_decisions.dec3.name = decs[2].individualDecisions[0].introText
  if (scenario.substring(3, 4) === '0')
    ret_decisions.dec3.decision = decs[2].individualDecisions[0].options[0].text
  else
    ret_decisions.dec3.decision = decs[2].individualDecisions[0].options[1].text
  ret_decisions.dec4 = {}
  ret_decisions.dec4.name = decs[2].individualDecisions[1].introText
  if (e < 3)
    ret_decisions.dec4.decision = decs[2].individualDecisions[1].options[0].text
  else if (e >= 3 && e < 6) {
    ret_decisions.dec4.decision = decs[2].individualDecisions[1].options[1].text
    e -= 3
  } else {
    ret_decisions.dec4.decision = decs[2].individualDecisions[1].options[2].text
    e -= 6
  }
  ret_decisions.dec5 = {}
  ret_decisions.dec5.name = decs[3].individualDecisions[0].introText
  if (e === 0)
    ret_decisions.dec5.decision = decs[3].individualDecisions[0].options[0].text
  else if (e === 1) {
    ret_decisions.dec5.decision = decs[3].individualDecisions[0].options[1].text
  } else {
    ret_decisions.dec5.decision = decs[3].individualDecisions[0].options[2].text
  }

  return ret_decisions
}

export const GoalSummary = () => {
  const [state] = useContext(Context)
  const { t } = useTranslation()
  let decisionsMade = getDecisionsMade(state.selectedScenario)
  let decisionRanks = createListOfScenarios(state.weights)
  let optimalScenario = getDecisionsMade(decisionRanks[0].scenario)
  let score = decisionRanks.find(e => {
    return e.scenario === state.selectedScenario
  })
  return (
    <React.Fragment>
      <StyledGrid
        container
        direction="column"
        justify="space-between"
        alignItems="flex-start"
      >
        <GoalHeader>{t('goal.title')}</GoalHeader>
        <IntroText>{t('goal.summary')}</IntroText>
        <IntroText>
          {t('goalSummary.decisionsTaken') + ': ' + state.selectedScenario}
        </IntroText>
        <IntroText />
        <StyledTable>
          <StyledTableHead>
            <StyledTableRow>
              <StyledTableCell />
              <StyledTableCell>{t('goalSummary.decisionMade')}</StyledTableCell>
              <StyledTableCell>
                {t('goalSummary.optimalDecision')}
              </StyledTableCell>
            </StyledTableRow>
          </StyledTableHead>
          <StyledTableBody>
            <StyledTableRow>
              <StyledTableCell>{decisionsMade.dec1.name}</StyledTableCell>
              <StyledTableCell>{decisionsMade.dec1.decision}</StyledTableCell>
              <StyledTableCell>{optimalScenario.dec1.decision}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>{decisionsMade.dec2.name}</StyledTableCell>
              <StyledTableCell>{decisionsMade.dec2.decision}</StyledTableCell>
              <StyledTableCell>{optimalScenario.dec2.decision}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>{decisionsMade.dec3.name}</StyledTableCell>
              <StyledTableCell>{decisionsMade.dec3.decision}</StyledTableCell>
              <StyledTableCell>{optimalScenario.dec3.decision}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>{decisionsMade.dec4.name}</StyledTableCell>
              <StyledTableCell>{decisionsMade.dec4.decision}</StyledTableCell>
              <StyledTableCell>{optimalScenario.dec4.decision}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>{decisionsMade.dec5.name}</StyledTableCell>
              <StyledTableCell>{decisionsMade.dec5.decision}</StyledTableCell>
              <StyledTableCell>{optimalScenario.dec5.decision}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>{t('goalSummary.totalScore')}</StyledTableCell>
              <StyledTableCell>{score.score}</StyledTableCell>
              <StyledTableCell>{decisionRanks[0].score}</StyledTableCell>
            </StyledTableRow>
          </StyledTableBody>
        </StyledTable>
      </StyledGrid>
      {/* <StyledGrid>
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
              <StyledTableCell>{t('goal.economic')}</StyledTableCell>
              <StyledTableCell>{state.weights.eco}%</StyledTableCell>
              <StyledTableCell>{state.weightedScores.eco}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>{t('goal.social')}</StyledTableCell>
              <StyledTableCell>{state.weights.soc}%</StyledTableCell>
              <StyledTableCell>{state.weightedScores.soc}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>{t('goal.environmental')}</StyledTableCell>
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
      </StyledGrid> */}
    </React.Fragment>
  )
}
