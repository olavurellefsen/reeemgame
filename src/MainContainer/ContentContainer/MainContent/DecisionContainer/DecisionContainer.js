/* eslint-disable prettier/prettier */
import React from 'react'
import { Container } from './DecisionContainer.style'
import { DecisionForm } from './DecisionForm/DecisionForm'
import Chart from 'react-google-charts'

export const DecisionContainer = ({ onOpenStartModal, weights }) => {
  return (
    <Container>
      <DecisionForm onOpenStartModal={onOpenStartModal} />
      {weights ? (
        <Chart
          chartType="PieChart"
          data={[
            ['Group', 'Percent'],
            ['Economic', weights.eco],
            ['Social', weights.soc],
            ['Enviromental', weights.env],
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
