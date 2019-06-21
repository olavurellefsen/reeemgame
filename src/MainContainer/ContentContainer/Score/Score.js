/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  StyledGrid,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableRow,
} from './Score.style'
import Popover from '@material-ui/core/Popover'
import Chart from 'react-google-charts'
import { GoalSummary } from '../MainContent/GoalContainer/GoalSummary/GoalSummary'

export const Score = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorPosition, setAnchorPosition] = React.useState(null)
  const [scoreChosen, setScoreChosen] = React.useState(null)
  const { t } = useTranslation()
  var scoreList = JSON.parse(localStorage.getItem('score3'))
  function handleClose() {
    setAnchorEl(null)
    setAnchorPosition(null)
  }
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    )

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
  }
  const { height, width } = useWindowDimensions()
  function handleClick(event) {
    setScoreChosen(scoreList[event.target.parentNode.rowIndex - 1])
    setAnchorEl(event.currentTarget)
    setAnchorPosition({
      left: Math.min(event.clientX, width - 520),
      top: Math.min(event.clientY, height - 420),
    })
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : null

  return (
    <React.Fragment>
      <StyledGrid>
        <StyledTable data-testid="scoreTable">
          <StyledTableHead>
            <StyledTableRow index={10}>
              <StyledTableCell>{t('score.date')}</StyledTableCell>
              <StyledTableCell>{t('score.score.long')}</StyledTableCell>
              <StyledTableCell>{t('score.weights.long')}</StyledTableCell>
            </StyledTableRow>
          </StyledTableHead>
          <StyledTableBody>
            {scoreList && scoreList.length > 0
              ? scoreList.map((s, i) => (
                  <StyledTableRow
                    key={i}
                    index={1 + i}
                    onClick={(e, row, col) => {
                      handleClick(e)
                    }}
                  >
                    <StyledTableCell>{s.date}</StyledTableCell>
                    <StyledTableCell>{s.weightedScores.sum}</StyledTableCell>
                    <StyledTableCell>
                      <div style={{ height: '50px', width: '80px' }}>
                        <Chart
                          chartType="PieChart"
                          data={[
                            [
                              'Group',
                              'Percent',
                              {
                                role: 'tooltip',
                                type: 'string',
                                p: { html: true },
                              },
                            ],
                            ['Economic', s.weights.eco, 'aaa'],
                            ['Social', s.weights.soc, 'bbb'],
                            ['Enviromental', s.weights.env, 'ccc'],
                          ]}
                          width={'100%'}
                          height={'100%'}
                          options={{
                            chartArea: {
                              left: '5%',
                              top: '5%',
                              width: '90%',
                              height: '90%',
                            },
                            legend: { position: 'none' },
                            tooltip: { isHtml: true, trigger: 'visible' },

                            //backgroundColor: '#E4E4E4',
                            is3D: true,
                          }}
                        />
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : null}
          </StyledTableBody>
        </StyledTable>
      </StyledGrid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorPosition={anchorPosition}
        anchorReference={'anchorPosition'}
      >
        {scoreChosen !== null ? (
          <GoalSummary
            selectedScenario={scoreChosen.scenario}
            weights={scoreChosen.weights}
          />
        ) : null}
        {/* <div>Hello</div> */}
      </Popover>
    </React.Fragment>
  )
}
