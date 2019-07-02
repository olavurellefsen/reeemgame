import React from 'react'
import { PropTypes } from 'prop-types'
import { Container, IntroText } from './WeightChart.style'
import Chart from 'react-google-charts'
import { useTranslation } from 'react-i18next'

export const WeightChart = ({ weights }) => {
  const { t } = useTranslation()

  return (
    <Container>
      <IntroText>{t('decisions.yourPOW')}</IntroText>
      <Chart
        chartType="PieChart"
        data={[
          ['Group', 'Percent'],
          [t('score.economic.long'), weights.eco],
          [t('score.social.long'), weights.soc],
          [t('score.environmental.long'), weights.env],
        ]}
        width={'280px'}
        height={'200px'}
        options={{
          chartArea: { left: '5%', top: '5%', width: '90%', height: '90%' },
          backgroundColor: { fill: 'transparent' },
          legend: { position: 'right', alignment: 'center' },
        }}
      />
    </Container>
  )
}
WeightChart.propTypes = {
  weights: PropTypes.object.isRequired,
}
