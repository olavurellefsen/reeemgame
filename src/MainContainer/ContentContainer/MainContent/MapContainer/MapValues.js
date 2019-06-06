import sampleData from '../../../../data/sampledata.json'
import eunochCountries from '../../../../data/eunochcountries.json'
import { convertToColor } from './convertToColor'

const minValueDemand = 90
const maxValueDemand = 400
const minValueEmissionLimit = 0
const maxValueEmissionLimit = 1000000

const specifiedAnnualDemand = (scenario, currentYear) =>
  sampleData
    .filter(
      country =>
        country.Parameter === 'SpecifiedAnnual Demand' &&
        country.Scenario === scenario
    )
    .map(country => ({
      code: country.Country.toLowerCase(),
      color: convertToColor(country[currentYear], 90, 400),
      value: country[currentYear],
      unit: country.Unit,
    }))

const emissionLimit = (scenario, currentYear) => {
  const emissionLimitData = sampleData
    .filter(
      country =>
        country.Parameter === 'AnnualEmissionLimit' &&
        country.Scenario === scenario
    )
    .map(countryGroup =>
      eunochCountries.map(country => ({
        code: country.code.toLowerCase(),
        color: convertToColor(countryGroup[currentYear], 0, 1000000),
      }))
    )
  return emissionLimitData[0]
}

export const getMapColors = (selectedIndicator, scenario, currentYear) => {
  if (selectedIndicator === 'electricityDemands') {
    return specifiedAnnualDemand(scenario, currentYear)
  }
  if (selectedIndicator === 'emissionLimit') {
    return emissionLimit(scenario, currentYear)
  }
  return []
}

export const getCountryDataForChart = (
  myCountry,
  currentYear,
  indicator,
  scenario
) => {
  var minValue
  var maxValue
  if (indicator === 'electricityDemands') {
    indicator = 'SpecifiedAnnual Demand'
    myCountry = myCountry.toUpperCase()
    minValue = minValueDemand
    maxValue = maxValueDemand
  }
  if (indicator === 'emissionLimit') {
    indicator = 'AnnualEmissionLimit'
    myCountry = 'EU28+CH+NO' //Because there is not distinct data for every country
    minValue = minValueEmissionLimit
    maxValue = maxValueEmissionLimit
  }
  const countryData = sampleData.filter(
    country =>
      country.Country === myCountry &&
      country.Parameter === indicator &&
      country.Scenario === scenario
  )
  let data = []
  //prevent compile errors if cliked on country with no data
  if (countryData.length) {
    data = [['Element', countryData[0]['Unit'], { role: 'style' }]]
    for (var i = 2015; i <= currentYear; i = i + (currentYear < 2030 ? 1 : 5)) {
      let year = [
        JSON.stringify(i),
        countryData[0][i],
        convertToColor(countryData[0][i], minValue, maxValue),
      ]

      data.push(year)
    }
  }
  return data
}
export const getUnit = indicator => {
  if (indicator === 'electricityDemands') indicator = 'SpecifiedAnnual Demand'
  else if (indicator === 'emissionLimit') indicator = 'AnnualEmissionLimit'
  const elmt = sampleData.find(element => element.Parameter === indicator)
  return elmt ? elmt.Unit : 'undefined'
}
