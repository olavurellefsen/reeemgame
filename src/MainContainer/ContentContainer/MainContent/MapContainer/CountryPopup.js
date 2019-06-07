import React, { useContext } from 'react'
import Context from '../../../../Context/Context'
import { PropTypes } from 'prop-types'
import Chart from 'react-google-charts'
import { useTranslation } from 'react-i18next'
import { getCountryDataForChart, getUnit } from './MapValues'
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

  let tempScenario = selectedScenario
  //TODO Important to change when real data has been added
  if (tempScenario !== 'C0T0E0' && tempScenario !== 'C0T0E1')
    tempScenario = 'C0T0E0'
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
            vAxis: { title: getUnit(selectedIndicator) },
          }}
        />
      </Content>
    </Container>
  )
}

CountryPopup.propTypes = {
  country: PropTypes.any,
  onClose: PropTypes.func,
}
