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
import { Close } from '@material-ui/icons'

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

  return (
    <Container>
      <Header>
        <Country>
          {t('countries.' + props.country)} -{' '}
          {t('indicator.' + selectedIndicator)}
        </Country>
        <Button onClick={props.onClose}>
          <Icon>
            <Close />
          </Icon>
        </Button>
      </Header>
      <Content>
        {!(state.gameState === 'over') && (
          <Chart
            chartType="ColumnChart"
            width="500px"
            height="350px"
            loader={<>Loading Chart</>}
            data={getCountryDataForChart(
              props.country,
              currentYear,
              selectedIndicator,
              selectedScenario
            )}
            options={{
              legend: { position: 'none' },
              vAxis: { title: 'Score' },
            }}
          />
        )}
        {state.gameState === 'over' && (
          <Chart
            chartType="ColumnChart"
            width="500px"
            height="350px"
            loader={<>Loading Chart</>}
            data={getCountryScoreForChart(
              props.country,
              selectedScenario,
              scoreElements
            )}
            options={{
              legend: { position: 'none' },
              vAxis: { title: getUnit(selectedIndicator) },
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
