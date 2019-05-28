import React from 'react'
import { PropTypes } from 'prop-types'
import Chart from 'react-google-charts'
import sampleData from '../../../../data/sampledata.json'
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
  function getData(myCountry, scenario, currentYear, parameter) {
    let data = [['Element', 'Density', { role: 'style' }]]
    const countryData = sampleData.filter(
      country =>
        country.Country === myCountry &&
        country.Parameter === parameter &&
        country.Scenario === scenario
    )
    for (var i = 2015; i <= currentYear; i = i + 5) {
      let year = [i, countryData[0][i], 'gray']
      data.push(year)
    }
    // map(country => ({
    //   code: country.Country.toLowerCase(),
    //   color: convertToColor(country[currentYear], 90, 400),
    //   value: country[currentYear],
    //   unit: country.Unit,
    // }))
    return data
  }
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
          width="100%"
          heigth="400px"
          data={getData('AT', 'C0T0E0', 2040, 'SpecifiedAnnual Demand')}
        />
      </Content>
    </Container>
  )
}

CountryPopup.propTypes = {
  country: PropTypes.any,
  onClose: PropTypes.func,
}
