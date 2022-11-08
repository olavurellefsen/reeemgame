import React, { useContext } from 'react'
import Context from '../../../../Context/Context'
import { PropTypes } from 'prop-types'
import Chart from 'react-google-charts'
import { useTranslation } from 'react-i18next'
import {
  getCountryDataForChart,
  getUnit,
  getCountryScoreForChart,
} from './MapValues'
import {
  Container,
  Country,
  Header,
  Content,
  Icon,
  Button,
} from './CountryPopup.style'
import { Close } from '@mui/icons-material'

export const CountryPopup = props => {
  const { t } = useTranslation()
  const [state] = useContext(Context)
  const currentYear = state.currentYear
  const selectedScenario = state.selectedScenario
  const selectedIndicator = state.selectedIndicator
  const scoreElements = {
    env: t('score.environmental.short'),
    eco: t('score.economic.short'),
    soc: t('score.social.short'),
    sum: t('score.sum.short'),
  }
  const title =
    state.selectedIndicator === 'score'
      ? t('general.score')
      : t('indicator.' + selectedIndicator)

  let tempScenario = selectedScenario
  //TODO Important to change when real data has been added Very Important
  if (tempScenario !== 'C0T0E0' && tempScenario !== 'C0T0E1')
    tempScenario = 'C0T0E0'
  const unit = getUnit(selectedIndicator)
  return (
    <Container>
      <Header>
        <Country>
          {t('countries.' + props.country)} - {title}
        </Country>
        <Button onClick={props.onClose}>
          <Icon>
            <Close />
          </Icon>
        </Button>
      </Header>
      <Content>
        {!(state.selectedIndicator === 'score') && (
          <Chart
            chartType="ColumnChart"
            width="500px"
            height="350px"
            loader={<>Loading Chart</>}
            data={getCountryDataForChart(
              props.country,
              currentYear,
              selectedIndicator,
              tempScenario
            )}
            options={{
              legend: { position: 'none' },
              vAxis: {
                title: unit,
              },
            }}
          />
        )}
        {state.selectedIndicator === 'score' && (
          <Chart
            chartType="ColumnChart"
            width="500px"
            height="350px"
            loader={<>Loading Chart</>}
            data={getCountryScoreForChart(
              props.country,
              tempScenario,
              scoreElements
            )}
            options={{
              legend: { position: 'none' },
              vAxis: {
                viewWindow: {
                  min: 0,
                  max: 10,
                },
              },
            }}
          />
        )}
      </Content>
    </Container>
  )
}

CountryPopup.propTypes = {
  country: PropTypes.any,
  onClose: PropTypes.func,
}
