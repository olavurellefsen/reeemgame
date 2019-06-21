/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Container } from './DecisionContainer.style'
import { DecisionForm } from './DecisionForm/DecisionForm'
import Chart from 'react-google-charts'
import { useTranslation } from 'react-i18next'

export const DecisionContainer = ({ onOpenStartModal, weights }) => {
  const { t } = useTranslation()
  const [showChart, setShowChart] = useState(false)

  function onStart() {
    setShowChart(true)
    onOpenStartModal()
  }
  return (
    <Container>
      <DecisionForm onStart={onStart} />
      {weights && showChart ? (
        <Chart
          chartType="PieChart"
          data={[
            ['Group', 'Percent'],
            [t('score.economic.long'), weights.eco],
            [t('score.social.long'), weights.soc],
            [t('score.environmental.long'), weights.env],
          ]}
          width={'280px'}
          height={'250px'}
          options={{
            chartArea: { left: '5%', top: '5%', width: '90%', height: '90%' },
          }}
        />
      ) : null}
    </Container>
  )
}
DecisionContainer.propTypes = {
  weights: PropTypes.any,
  onOpenStartModal: PropTypes.func,
  showChart: PropTypes.bool,
}
