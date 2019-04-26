import React, { useContext } from 'react'
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
  return (
    <Grid
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Weight</TableCell>
            <TableCell>Weighted Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Economic</TableCell>
            <TableCell>{state.weights.eco}%</TableCell>
            <TableCell>{state.weightedScores.eco}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Social</TableCell>
            <TableCell>{state.weights.soc}%</TableCell>
            <TableCell>{state.weightedScores.soc}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Environmental</TableCell>
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
