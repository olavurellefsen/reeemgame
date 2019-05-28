import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Context from './../../../../../Context/Context'
import { GoalHeader, IntroText } from './GoalSummary.style'

export const GoalSummary = () => {
  const [state] = useContext(Context)
  const { t } = useTranslation()

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start"
    >
      <GoalHeader>{t('goal.title')}</GoalHeader>
      <IntroText>{t('goal.summary')}</IntroText>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>{t('goal.weight')}</TableCell>
            <TableCell>{t('goal.weightedScore')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{t('goal.economic')}</TableCell>
            <TableCell>{state.weights.eco}%</TableCell>
            <TableCell>{state.weightedScores.eco}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('goal.social')}</TableCell>
            <TableCell>{state.weights.soc}%</TableCell>
            <TableCell>{state.weightedScores.soc}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('goal.environmental')}</TableCell>
            <TableCell>{state.weights.env}%</TableCell>
            <TableCell>{state.weightedScores.env}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell>{state.weightedScores.sum}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  )
}
