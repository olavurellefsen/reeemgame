import React, { useContext } from 'react'
import Context from '../../../../Context/Context'
import { PropTypes } from 'prop-types'
import Chart from 'react-google-charts'
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
  const [state] = useContext(Context)
  const currentYear = state.currentYear
  const selectedScenario = state.selectedScenario
  const selectedIndicator = state.selectedIndicator

  return (
    <Container>
      <Header>
        <Country>{props.country}</Country>
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
            selectedScenario
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
